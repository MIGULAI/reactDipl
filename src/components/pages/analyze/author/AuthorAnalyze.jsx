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

const AuthorAnalyze = () => {
    const { id } = useParams()
    const [years, setYears] = useState()
    const [year, setYear] = useState()
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
    useEffect(() => {
        errFetching && console.log(errFetching);
    }, [errFetching])
    useEffect(() => {
        fetchPlanYears(id)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return <PageWrapper title="Сторінка статистика по кафедрі">
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
                                </div>
                                : <MyFileLoader />
                        }
                        {
                            year
                                ? <>
                                    <PlanSuccess id={Number(id)} year={Number(year)} />
                                    <AuthorStats id={Number(id)} />
                                </>
                                : <></>
                        }
                    </>
            }
        </CardWrapper>
    </PageWrapper>
}

export default AuthorAnalyze