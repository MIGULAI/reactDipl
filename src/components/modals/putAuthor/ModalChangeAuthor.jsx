import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import { AuthContext } from "../../../context";
import AuthorForm from "../../forms/AuthorForms/AddForm";

const ModalChangeAuthor = ({ id }) => {
    const [author, setAuthor] = useState({
        Orcid: '', Scopus: '', Name: '', SerName: '', Patronic: '', NameEng: '', SerNameEng: '', PatronicEng: '', PIPua: '', PIPen: '', phone: '', email: '', Specialty: 1, Department: 1, Organization: 1, Position: 1, Rank: 1, Degree: 1, StartDate: '', EndDate: ''
    })

    const { accessToken, setMessageModalVisible, setMessageClasses, setMessageArray } = useContext(AuthContext)

    const [fetchAuthor, isAuthorFetching, errFetching] = useFetching(async () => {
        const response = await PostService.fetchAuthor(id)
        if (response.data.success) {
            setAuthor(response.data.data.author)

        } else {
            setMessageModalVisible(true)
            setMessageClasses(['error'])
            setMessageArray(response.data.message)
        }
    })


    const [putAuthor, isPutting, putErr] = useFetching(async (data) => {
        data['id'] = id
        const response = await PostService.putAuthor(data, accessToken)
        console.log(response.data.success);
        if (response.data.success) {
            console.log(1);
            setMessageClasses(['message'])
        } else {
            setMessageClasses(['error'])
        }
        setMessageArray(response.data.message)
        setMessageModalVisible(true)
        fetchAuthor()
    })

    const save = (data) => {
        console.log(data);
        putAuthor(data)
    }
    useEffect(() => {
        errFetching && console.log(errFetching);
        putErr && console.log(putErr);
    }, [errFetching, putErr])
    useEffect(() => {
        fetchAuthor()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {
                (isAuthorFetching || isPutting)
                    ? <MyFileLoader />
                    : <div>
                        <AuthorForm author={author} onSubmit={save} submitButtonValue={'Оновити'} />
                    </div>
            }
        </>
    )
}


ModalChangeAuthor.propTypes = {
    id: PropTypes.number,
}


export default ModalChangeAuthor