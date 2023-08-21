import React, { useContext, useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { AuthContext } from "../../../context";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyLoader from "../../UI/MyLoader/MyLoader"
import MyError from "../../UI/MyError/MyError";
import AddForm from "../../forms/AuthorForms/AddForm";

const AddAutor = () => {
    const { accessToken, setMessageArray, setMessageClasses, setMessageModalVisible } = useContext(AuthContext)
    const [err, setErr] = useState([])
    const [saveNewAuthor, isAuthorSaving, saveError] = useFetching(async (data) => {
        const response = await PostService.addAutor(data, accessToken)
        setMessageArray(response.data.message)
        if (response.data.success) {
            setMessageClasses(['message'])
        } else {
            setMessageClasses(['error'])
            setErr([...err, response.data.message])
        }
        setMessageModalVisible(true)
        console.log(response.data);
    })
    const saveAuthor = (data) => {
        console.log(data);
        saveNewAuthor(data)
    }
    useEffect(() => {
        saveError && console.log(saveError);
    }, [saveError])
    return (
        <PageWrapper style={{ justifyContent: 'space-around' }} title={'Створення нового автора'}>
            {err.length !== 0 && <MyError onClick={e => setErr([])}>{err}</MyError>}
            {
                isAuthorSaving
                    ? <MyLoader />
                    :
                    <div>
                        <AddForm
                            submitButtonValue={'Додати автора'}
                            onSubmit={saveAuthor}
                        />
                    </div>
            }
        </PageWrapper>
    )
}

export default AddAutor;