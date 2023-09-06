import React, { useEffect, useState } from "react"
import PostService from "../../../../API/PostService";
import { useFetching } from "../../../../hooks/useFetching";
import MyFileLoader from "../../../UI/MyFileLoader/MyFileLoader";

const BasicDepStat = () => {
    const [departmentStat, setDepartmentStat] = useState()
    const [fetchDepartmentStat, isAuthorsCountFetching, errAuthorsCountFetching] = useFetching(async () => {
        const response = await PostService.fetchDepStatistic();
        if (response.data.success) {
            setDepartmentStat(response.data.data)
        }
    }, true)

    useEffect(() => {
        errAuthorsCountFetching && console.log(errAuthorsCountFetching);
    }, [errAuthorsCountFetching])
    useEffect(() => {
        fetchDepartmentStat()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return <>
        {
            isAuthorsCountFetching
                ? <MyFileLoader />
                : <>
                    <div>
                        <span>Кількість викладачів кафедри :</span>
                        <span>{departmentStat.countAuthors}</span>
                    </div>
                    <div>
                        <span>Кількість публікацій за участю членів кафедри :</span>
                        <span>{departmentStat.publs}</span>
                    </div>
                    <div>
                        <span>Кількість публікацій за участю студентів :</span>
                        <span>{departmentStat.publsWithStudents}</span>
                    </div>
                </>
        }

    </>
}

export default BasicDepStat