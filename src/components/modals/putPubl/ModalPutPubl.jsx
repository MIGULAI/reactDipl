import React, { useContext, useEffect, useState } from "react";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import { AuthContext } from "../../../context";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import AddPublForm from "../../forms/PublsForms/AddForm";

const ModalPutPubl = ({ id, setPublId }) => {
    const { accessToken } = useContext(AuthContext)
    const [publ, setPubl] = useState()


    const [fetchPubl, isPublFetching, publErr] = useFetching(async () => {
        const response = await PostService.fetchPublication(id)
        let newPubl = response.data.data.publication
        newPubl.authors = response.data.data.authors
        setPubl(newPubl)
    })

    const [putPublication, isPutting, putErr] = useFetching(async (publicatiion) => {
        const response = await PostService.putPublication(publicatiion, accessToken)
        console.log(response);
        if(response.data.success) fetchPubl()
    })

    const savePubl = (data) => {
        data.id = id
        data.authors = data.authorList
        putPublication(data)
    }
    useEffect(() => {
        let errArray = []
        publErr !== '' && errArray.push(publErr)
        putErr !== '' && errArray.push(putErr)
    }, [publErr, putErr])

    useEffect(() => {
        fetchPubl()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return <>
        {
            (isPublFetching || isPutting)
                ? <MyFileLoader />
                :
                <div>
                    {
                        publ !== undefined && <AddPublForm afterPublisherCallback={fetchPubl} submitButtonValue={'Оновити'} onSubmit={savePubl} publication={publ} />
                    }

                </ div>
        }
    </>
}

export default ModalPutPubl