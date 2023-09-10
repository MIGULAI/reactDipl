import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useNavigate } from "react-router-dom";
import MyButton from "../../UI/MyButton/MyButton";
import CardWrapper from "../CardWrapper";
import MySelector from "../../UI/MySelector/MySelector";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";

const Analyze = () => {
    const navigate = useNavigate()
    const [authorSelected, setAuthorSelected] = useState()
    const [authorsOptions, setAuthorsOptions] = useState()
    const navigatePersone = () => {
        authorSelected && navigate(`/analyze/author/${authorSelected}`)
    }
    const [fetchAuthors, isFetching, errFetching] = useFetching(async () => {
        const response = await PostService.fetchPlaningAutors()
        if (response.data.success) {
            const options = response.data.data.authors.map(el => { return { value: el.id, str: `${el.SerName} ${el.Name} ${el.Patronic}` } })
            setAuthorsOptions(options)
        }
    })
    const navigateDepartment = () => {
        navigate('/analyze/department')
    }
    useEffect(() => {
        errFetching && console.log(errFetching);
    }, [errFetching])
    useEffect(() => {
        fetchAuthors()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <PageWrapper title="Сторінка аналізу">
            <CardWrapper>
                <>
                    <div>
                        <MyButton onClick={navigateDepartment}>Аналіз за кафедрою</MyButton>
                    </div>
                    {
                        (!isFetching && authorsOptions) ? <MySelector
                            options={authorsOptions}
                            selected={authorSelected}
                            onChange={(e) => setAuthorSelected(e.target.value)}
                        />
                            : <MyFileLoader />
                    }

                    {
                        authorSelected && <MyButton onClick={navigatePersone} >Аналіз за персоною</MyButton>
                    }
                </>
            </CardWrapper>
        </PageWrapper>
    )
}

export default Analyze;