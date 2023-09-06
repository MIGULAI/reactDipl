import React from "react";
import PageWrapper from "../../PageWrapper";
import CardWrapper from "../../CardWrapper";
import BasicDepStat from "../../../analyze/department/BasicStat/BasicStat";

const DepartmentAnalyze = () => {

    return <PageWrapper title="Сторінка статистика по кафедрі">
        <CardWrapper>
            <BasicDepStat/>
        </CardWrapper>
    </PageWrapper>
}

export default DepartmentAnalyze