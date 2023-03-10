import React, { useContext, useEffect, useState } from "react";
import MyInput from "../../UI/MyInput/MyInput";
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyLoader from "../../UI/MyLoader/MyLoader";
import PageWrapper from "../PageWrapper";
import classes from "./Editor.module.css"
import { AuthContext } from "../../../context";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyError from "../../UI/MyError/MyError";
import MyButton from "../../UI/MyButton/MyButton";
import { useNavigate } from "react-router-dom";
import MyModal from "../../UI/MyModal/MyModal";
import { CheckYear } from "../../../utils/functions/CheckYear";
import PlanModalChecker from "./modals/PlanModalChecker";
import MyInputFile from "../../UI/MyInputFile/MyInputFile";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import DepAuthors from "../../files/depAuthors/DepAuthors";

import Recalculate from "./SubFunctions/Recalculate";
import MySelector from "../../UI/MySelector/MySelector";
import MyActions from "../../UI/MyActionKeys/MyActions";
import MyStats from "../../UI/MyStats/MyStats";

const Editor = () => {
    const { statBar, item, fileLoader, loaderItem, fileInput } = classes
    const { isAuth, accessToken, setKeyActive, globalSetup, setGlobalSetup } = useContext(AuthContext)

    const navig = useNavigate();

    const [authorsPublCount, setAuthorsPublCount] = useState(Number(globalSetup.authorsPublCount))
    const [autoSubmit, setAutoSubmit] = useState('true' === globalSetup.authoSuccess)
    const [err, setErr] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isStatsLoading, setIsStatsLoading] = useState(false)
    const [statistic, setStatistic] = useState({ publicationsCount: 0, authorsCount: 0 })
    const [modalPlan, setModalPlan] = useState(false)
    const [defaultYear, setDefaultYear] = useState(() => CheckYear())
    const [newPlans, setNewPlans] = useState([])


   /* const [statFetching, isStatFetching, statErr] = useFetching(async (token) => {
        const response = await PostService.fetchingStatistic(token)
        setStatistic({ publicationsCount: response.data.data.publicationsCount, authorsCount: response.data.data.authorsCount })
        !response.data.success && setErr([...err, response.data.message])
    })*/

    const [createPlanFetching, isPlanCreating, createErr] = useFetching(async (year) => {
        const response = await PostService.createPlanOnYear(accessToken, year)

        setNewPlans(response.data.data.plans)
    })

    const [savePlan, isPlanSaving, saveErr] = useFetching(async (plan) => {
        const response = await PostService.savePlan(accessToken, plan)
        if (response.data.success) {
            setNewPlans([])
            alert(response.data.message)
            setModalPlan(false)
        }
    })

    const [fileFetching, isFileFetching, fileErr] = useFetching(async (file) => {
        const response = await PostService.fetchJSONAuthors(accessToken, file)
        console.log(response);
    })


    const [setAuthorNumber, isNumberSetting, numbErr] = useFetching(async () => {
        const response = await PostService.putMaxAuthors(accessToken, authorsPublCount)
        console.log(response);
        if (response.data.success) setGlobalSetup({ ...globalSetup, authorsPublCount: authorsPublCount })
        else setErr([...err, response.data.message])
    })

    const [fetchPlansYear, isYearFetching, yearErr] = useFetching(() => {
        // const response = await PostService.fetchPlanYearList();
        // const years = response.data.data.years

        let years = ['2023', '2024']
        console.log(years);
        let posibleYears = []
        for (let i = Number(years[0]) - 5; i < Number(years[0]); i++) {
            posibleYears.push(i);
        }

        let start = parseInt(years[0], 10)
        for(let i = 0; i < years.length;i=i){
            start += 1;
            (start !== Number(years[i]) && start < Number(years[years.length -1 ]))? posibleYears.push(start) : ++i
        }
        for(let i = Number(years[years.length -1]) + 1; i <= Number(years[years.length -1]) + 5; i++){
            posibleYears.push(i)
        }
        console.log(posibleYears);

    })

    const handleUploadClick = (filePublications) => {
        if (!filePublications) {
            setErr([...err, 'File did not selected'])
        } else {
            fileFetching(filePublications)
        }
    }

    const handleAuthorsNumber = () => {
        setAuthorNumber()
    }

    const cencelPlans = () => {
        setModalPlan(false)
        setNewPlans([])
    }

    const createPlan = (year, status) => {
        setModalPlan(true)
        createPlanFetching(year, status)
    }
    useEffect(() => {
        console.log(yearErr);
    }, [yearErr])

    useEffect(() => {
        setKeyActive(0)
        setIsLoading(false)
    }, [])

    return (
        <PageWrapper title={"???????????????? ????????????????????????????"}>
            {err.length !== 0 && <MyError onClick={() => setErr([])}>{err}</MyError>}
            {
                isLoading 
                    ? <MyLoader />
                    : <div>
                        <MyModal visible={modalPlan} setVisible={setModalPlan}>
                            {
                                isPlanCreating || isPlanSaving
                                    ? <MyFileLoader />
                                    : <PlanModalChecker saveFunc={e => savePlan(newPlans)} cancelFunc={cencelPlans} newPlans={newPlans} setPlans={setNewPlans} />
                            }
                        </MyModal>
                        <MyStats setBoboErr={setErr} />
                        <div className={statBar}>
                            <div className={item}>
                                <MyButton onClick={e => setModalPlan(true)}>{'??????????'}</MyButton>
                            </div>
                            <div className={item}>
                                <MyLabel>?????????????????? ?????????? ???? ???????????????? ?????? :</MyLabel>
                                <MyButton onClick={e => createPlan(defaultYear, false)}>{`???????????????? ???????? ???? ${defaultYear}`}</MyButton>
                            </div>
                            <div className={item}>
                                <MyLabel>???????? ?? ?????????????????? ???????????? :</MyLabel>
                                <MyButton onClick={fetchPlansYear}>??????????????????????</MyButton>
                                {/* <MySelector   /> */}
                            </div>
                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                <div className={item}>
                                    <MyLabel>?????????????????? ?????????????? ?? ???????????? ???????????????????? :</MyLabel>
                                    <MyInput value={authorsPublCount} onChange={(e) => setAuthorsPublCount(Number(e.target.value))} />
                                    <MyButton onClick={handleAuthorsNumber}>{`????????????????`}</MyButton>
                                </div>
                                <div className={item}>
                                    <MyLabel>?????????????????????????????????? :</MyLabel>
                                    <MyInput type={'checkbox'} defaultChecked={autoSubmit} onChange={(e) => setAutoSubmit(!e.target.value)} />
                                    <MyButton onClick={e => console.log(`????????????????`)}>{`????????????????`}</MyButton>
                                </div>
                            </div>
                        </div>
                        <div className={statBar}>
                            <MyInputFile
                                isFileFetching={isFileFetching}
                                saveFile={handleUploadClick}
                            />
                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                <Recalculate accessToken={accessToken} />
                            </div>
                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                <DepAuthors />
                            </div>
                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                <MyActions isAuth={isAuth} />
                            </div>
                        </div>
                    </div>
            }
        </PageWrapper>
    )
}

export default Editor;