import React, { useEffect, useContext } from "react";
import PageWrapper from "../PageWrapper";

import { AuthContext } from "../../../context";
import { useState } from "react";
import MyLoader from "../../UI/MyLoader/MyLoader";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import AddPublForm from "../../forms/PublsForms/AddForm";

const AddPubl = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { accessToken, setKeyActive, setMessageArray, setMessageClasses, setMessageModalVisible } = useContext(AuthContext)

    const [isAddPublFetching, isSaveFetching, pubErr] = useFetching(async (publ) => {
        const response = await PostService.addPub(publ, accessToken)
        if(response.data.success) {
            setMessageClasses(['message'])
        }else {
            setMessageClasses(['error'])
        }
        setMessageArray(response.data.message)
        setMessageModalVisible(true)
    })

    useEffect(() => {
        let errArray = []
        pubErr !== '' && errArray.push(pubErr)
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
                        <AddPublForm submitButtonValue={'Додати'} onSubmit={isAddPublFetching} afterPublisherCallback={isAddPublFetching}/>
                    </ div>
            }

        </PageWrapper>
    )
}

export default AddPubl;