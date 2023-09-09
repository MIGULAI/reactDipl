import React from "react";
import PageWrapper from "../../PageWrapper";
import CardWrapper from "../../CardWrapper";
import BasicDepStat from "../../../analyze/department/BasicStat/BasicStat";
import StudentCount from "../../../analyze/department/StudentCount/StudentCount";
import PublicationsByType from "../../../analyze/department/PublicationsByType/PublicationsByType";

const DepartmentAnalyze = () => {

    return <PageWrapper title="Сторінка статистика по кафедрі">
        <CardWrapper>
            <BasicDepStat/>
            <StudentCount/>
            <PublicationsByType/>
        </CardWrapper>
    </PageWrapper>
}

export default DepartmentAnalyze