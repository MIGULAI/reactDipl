import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../../../hooks/useFetching";
import PostService from "../../../../API/PostService";
import PageWrapper from "../../PageWrapper";
import classes from './AboutPublication.module.css'
import MyFileLoader from "../../../UI/MyFileLoader/MyFileLoader";
import OneAuthorName from "../../../UI/Author/OneAuthrName";

const AboutPublication = () => {
    const { id } = useParams()
    const [publication, setPublication] = useState()
    const [publicationAuthors, setPublicationAuthors] = useState()
    const [fetchPublication, isFetching, errFetching] = useFetching(async () => {
        const response = await PostService.fetchPublication(id)
        console.log(response);
        if (response.data.success) {
            setPublication(response.data.data.publication)
            setPublicationAuthors(response.data.data.authors)
        }
    }, true)

    useEffect(() => {
        errFetching && errFetching()
    }, [errFetching])
    useEffect(() => {
        fetchPublication()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return <PageWrapper title="Сторінка пошуку публікації по БД">
        {
            isFetching
                ? <MyFileLoader />
                : <div className={classes.publication}>
                    <span className={classes.item}>
                        <p className={classes.label}>Назва публікації :</p>
                        <p>{publication.Name}</p>
                    </span>
                    <span className={classes.item}>
                        <p className={classes.label}>Номер публікації :</p>
                        <p>{publication.PublicationNumber ? publication.PublicationNumber : '-'}</p>
                    </span>
                    <span className={classes.item}>
                        <p className={classes.label}>Дата видання :</p>
                        <p>{new Date(publication.PublicationDate).toLocaleDateString()}</p>
                    </span>
                    <span className={classes.item}>
                        <p className={classes.label}>Друкованих публікацій :</p>
                        <p>{publication.UPP}</p>
                    </span>
                    {
                        publicationAuthors.map(author =>
                                <OneAuthorName key={author.Author} id={author.Author} />
                        )
                    }

                </div>
        }

    </PageWrapper>

}

export default AboutPublication