import React, { useEffect, useContext } from "react";
import PageWrapper from "../PageWrapper";

import { AuthContext } from "../../../context";
import { useState } from "react";
import MyLoader from "../../UI/MyLoader/MyLoader";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";

import MyError from "../../UI/MyError/MyError";
import AddPublForm from "../../forms/PublsForms/AddForm";

const AddPubl = () => {

    // let now = new Date()
    const [isLoading, setIsLoading] = useState(true)
    const { accessToken, setKeyActive, setMessageArray, setMessageClasses, setMessageModalVisible } = useContext(AuthContext)
    const [err, setError] = useState([])

    const [isAddPublFetching, isSaveFetching, pubErr] = useFetching(async (publ) => {
        // console.log(publ);
        const response = await PostService.addPub(publ, accessToken)
        if(response.data.succes) {
            setMessageClasses(['message'])
        }else {
            setMessageClasses(['error'])
            setError([...err, response.data.message])
        }
        setMessageArray(response.data.message)
        setMessageModalVisible(true)

        //if (!response.data.success) setError([...err, response.data.message])
        // if (response.data.success) {
        //     setPubl({ name: '', startPage: 0, lastPage: 0, UPP: 0, type: 1, lang: 1, publisher: 1, date: new Date(), issue_numb: '', url: '', authors: [], supervisor: 0})
        //     //setAuthors(Array(Number(globalSetup.authorsPublCount)).fill(null))
        // }
    })

    // const savePubl = () => {
    //     let obj = publ
    //     let a = []
    //     if (a.length === 0) {
    //         setError([...err, "Публікація повинна мати хочаб одного автора!!!"])
    //     } else {
    //         obj.authors = a
    //         isAddPublFetching(publ);
    //     }
    // }

    useEffect(() => {
        let errArray = []
       // setErr !== '' && errArray.push(setErr)
        pubErr !== '' && errArray.push(pubErr)
       // errArray.length && setError([...err, errArray])
    }, [ pubErr])

    useEffect(() => {
        setKeyActive(0)
        setIsLoading(false)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageWrapper title={'Додання публікації'}>
            {
                isLoading  || isSaveFetching
                    ? <MyLoader />
                    : <div>
                        <AddPublForm submitButtonValue={'Додати'} onSubmit={isAddPublFetching}/>
                        {err.length !== 0 && <MyError onClick={e => setError([])}>{err}</MyError>}
                    </ div>
            }

        </PageWrapper>
    )
}

export default AddPubl;