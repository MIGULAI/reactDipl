import React, { useContext, useState } from "react";
import PageWrapper from "../PageWrapper";
import { AuthContext } from "../../../context";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyLoader from "../../UI/MyLoader/MyLoader"
import MyError from "../../UI/MyError/MyError";
import AddForm from "../../forms/AuthorForms/AddForm";

const AddAutor = () => {
    const { accessToken } = useContext(AuthContext)
    const [err, setErr] = useState([])
    const [saveNewAuthor, isAuthorSaving, saveError] = useFetching(async (data) => {
        const response = await PostService.addAutor(data, accessToken)
        console.log(response.data);
        if (!response.data.success) setErr([...err, response.data.message])
    })
    const saveAuthor = (data) => {
        console.log(data);
        saveNewAuthor(data)
    }
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