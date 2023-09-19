import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../PageWrapper";
import CardWrapper from "../../CardWrapper";
import { useFetching } from "../../../../hooks/useFetching";
import PostService from "../../../../API/PostService";
import MySelector from "../../../UI/MySelector/MySelector";
import MyFileLoader from "../../../UI/MyFileLoader/MyFileLoader";
import PlanSuccess from "../../../analyze/author/PlanSuccess/PlanSuccess";
import AuthorStats from "../../../analyze/author/AuthorStats/AuthorStats";
import MyButton from "../../../UI/MyButton/MyButton";

const AuthorAnalyze = () => {
    const { id } = useParams()
    const [years, setYears] = useState()
    const [year, setYear] = useState()
    const [author, setAuthor] = useState()
    const [fetchAuthor, isAuthorFetching, errAQuthorFetching] = useFetching(async (id) => {
        const response = await PostService.fetchAuthor(id)
        if (response.data.success) {
            setAuthor(response.data.data.author)
        }
    }, true)
    const [fetchPlanYears, isFetching, errFetching] = useFetching(async (id) => {
        const response = await PostService.fetchPlanYearListByAuthor(id)
        if (response.data.success) {
            const y = response.data.data.years.map(el => { return { value: Number(el), str: el } })
            y.sort((a, b) => {
                return a.value - b.value
            })
            setYears(y)
        }
    })
    const docLink = (id) => {
        console.log(id);
        window.open(window.location.host.includes('localhost') ?   window.location.protocol + "//" + window.location.hostname +`:8088/author/zvit?id=${id}` :  window.location.protocol + "//" + window.location.hostname +`/author/zvit?id=${id}`, '_blank')
    }
    useEffect(() => {
        errFetching && console.log(errFetching);
        errAQuthorFetching && console.log(errAQuthorFetching);
    }, [errFetching, errAQuthorFetching])
    useEffect(() => {
        fetchAuthor(id)
        fetchPlanYears(id)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return <PageWrapper title={isAuthorFetching ? '...' : "Сторінка статистика автору : " + author.SerName + ' ' + author.Name + ' ' + author.Patronic}>
        <CardWrapper>
            {
                isFetching ?
                    <MyFileLoader />
                    : <>
                        {
                            years
                                ? <div>
                                    <label>Виберіть рік :</label>
                                    <MySelector
                                        options={years}
                                        selected={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    />
                                    <MyButton onClick={() => docLink(id)} >Звіт</MyButton>
                                </div>
                                : <MyFileLoader />
                        }
                        {
                            year
                                ? <>
                                    <PlanSuccess id={Number(id)} year={Number(year)} />
                                </>
                                : <></>
                        }
                        <AuthorStats id={Number(id)} />
                    </>
            }
        </CardWrapper>
    </PageWrapper>
}

export default AuthorAnalyze