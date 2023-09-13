import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../../../hooks/useFetching";
import PostService from "../../../../API/PostService";


const AboutPublication = () => {
    const {id} = useParams()
    const [fetchPublication, isFetching, errFetching] = useFetching(async () => {
        const response = await PostService.fetchPublication(id)
        console.log(response);
    })
    useEffect(() => {
        fetchPublication()
    },[])
    return <>
    </>
}

export default AboutPublication