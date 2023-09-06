import React from "react";
import PageWrapper from "../PageWrapper";
import { useNavigate } from "react-router-dom";
import MyButton from "../../UI/MyButton/MyButton";
import CardWrapper from "../CardWrapper";

const Analyze = () => {
    const navigate = useNavigate()
    const navigatePersone = () => {

    }

    const navigateDepartment = () => {
        navigate('/analyze/department')
    }
    return (
        <PageWrapper title="Сторінка аналізу">
            <CardWrapper>
                <MyButton onClick={navigateDepartment}>Аналіз за кафедрою</MyButton>
                <MyButton onClick={navigatePersone} disabled={true}>Аналіз за персоною</MyButton>
            </CardWrapper>
        </PageWrapper>
    )
}

export default Analyze;