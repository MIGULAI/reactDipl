import React from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../PageWrapper";

const PlanById = () => {
    const params = useParams()

    return (
        <PageWrapper>
            <h1>hello world {params.id}</h1>
        </PageWrapper>
    )
}

export default PlanById