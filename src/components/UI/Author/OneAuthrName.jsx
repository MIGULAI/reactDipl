import React, { useEffect, useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyFileLoader from "../MyFileLoader/MyFileLoader";
import classes from './OneAuthorName.module.css'
import { useNavigate } from "react-router-dom";

const OneAuthorName = ({ id }) => {
    const [author, setAuthor] = useState()
    const navigate = useNavigate()
    const [fethcAuthor, isFetching, errFetching] = useFetching(async (id) => {
        const response = await PostService.fetchAuthor(id)
        if (response.data.success) {
            setAuthor(response.data.data.author)
        }
    }, true)
    const navigateAboutAuthor = (id) => {
        navigate(`/about/author/${id}`)
    }
    useEffect(() => {
        errFetching && console.log(errFetching);
    }, [errFetching])
    useEffect(() => {
        fethcAuthor(id)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return <>
        {
            isFetching
                ? <MyFileLoader />
                : <span className={classes.item}>
                    <p className={classes.label}>Автор :</p>
                    <p className={classes.link} onClick={() => navigateAboutAuthor(id)}>{author.SerName + ' ' + author.Name + ' ' + author.Patronic}</p>
                </span>
        }
    </>
}

export default OneAuthorName