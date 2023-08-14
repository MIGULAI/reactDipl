import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import { AuthContext } from "../../../context";
import classes from "../../pages/addAutor/AddAutor.module.css"
import MyButton from "../../UI/MyButton/MyButton";
import AuthorForm from "../../forms/AuthorForms/AddForm";

const ModalChangeAuthor = ({ id }) => {
    const [author, setAuthor] = useState({
        Orcid: '', Scopus: '', Name: '', SerName: '', Patronic: '', NameEng: '', SerNameEng: '', PatronicEng: '', PIPua: '', PIPen: '', phone: '', email: '', Specialty: 1, Department: 1, Organization: 1, Position: 1, Rank: 1, Degree: 1, StartDate: '', EndDate: ''
    })

    const { accessToken } = useContext(AuthContext)

    const [fetchAuthor, isAuthorFetching, errFetching] = useFetching(async () => {
        const response = await PostService.fetchAuthor(id)
        setAuthor(response.data.data.author)
        console.log(response.data.data.author);
    })


    const [putAuthor, isPutting, putErr] = useFetching(async () => {
        const response = await PostService.putAuthor(author, accessToken)
        console.log(response);
    })

    const save = () => {
        putAuthor()
    }
    useEffect(() => {
        errFetching && console.log(errFetching);
        putErr && console.log(putErr);
    }, [errFetching, putErr])
    useEffect(() => {
        fetchAuthor()
        // subArrFetch()
    }, [])
    return (
        <>
            {
                (isAuthorFetching || isPutting )
                    ? <MyFileLoader />
                    : <div>
                        <AuthorForm author={author} setAuthor={setAuthor}/>
                        <div className={classes.but__wrapper}>
                            <MyButton onClick={() => save()}>Оновити</MyButton>
                        </div>
                    </div>
            }
        </>
    )
}


ModalChangeAuthor.propTypes = {
    id: PropTypes.number,
}


export default ModalChangeAuthor