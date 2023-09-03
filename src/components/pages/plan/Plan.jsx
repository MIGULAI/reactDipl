import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFetching } from "../../../hooks/useFetching";


import MyLoader from "../../UI/MyLoader/MyLoader";
import PageWrapper from "../PageWrapper";
import PostService from "../../../API/PostService";
import MyTable from "../../UI/MyTable/MyTable"
import PlanTR from "./PlanTR";
import MyButton from "../../UI/MyButton/MyButton";
import MyError from "../../UI/MyError/MyError";
import { AuthContext } from "../../../context";
import { CheckYear } from "../../../utils/functions/CheckYear";
import MySelector from "../../UI/MySelector/MySelector";

import classes from "./Plan.module.css"

const Plan = () => {
    const { myContentWrapper, myContentHeader, headerItem, contTableWrapper } = classes

    const navig = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [planYear, setPlanYear] = useState(CheckYear)
    const [options, setOptions] = useState([{ value: '', str: '' }])
    const [plans, setPlans] = useState([])
    const [selectedPlan, setSelectedPlan] = useState(-1)
    const [err, setError] = useState([])

    const { isAuth, apiKey, setKeyActive } = useContext(AuthContext)

    const [fetchYears, isYearLoading, yearError] = useFetching(async () => {
        const response = await PostService.fetchPlanYearList()
        let yearsArray = response.data.data.years;
        let optionsArray = []
        for (let i = 0; i < yearsArray.length; i++) {
            let option = { value: Number(yearsArray[i]), str: `${Number(yearsArray[i])} - ${Number(yearsArray[i]) + 1}` }
            optionsArray.push(option);
        }
        if (optionsArray[optionsArray.length - 1] < planYear) {
            setPlanYear(optionsArray[optionsArray.length - 1].value)
        }
        optionsArray =optionsArray.sort((a, b) => {
            if (a.value > b.value) return 1
            if (b.value > a.value) return -1
            return 0
        });
        setOptions(optionsArray);
    })

    const [fetchPlans, isPlanLoading, plansError] = useFetching(async (year, apiKey) => {
        const response = await PostService.fetchPlansByYear(year, apiKey)
        let planYears = response.data.data.plans
        setPlans(planYears);
    })

    const About = () => {
        navig(`/plan/about/${selectedPlan}`)
    }
    const AboutAndChange = () => {
        navig(`/plan/change/${selectedPlan}`)
    }

    useEffect(() => {
        if(isLoading){
            isAuth ? setKeyActive(1) : setKeyActive(0)
            fetchYears()
            setIsLoading(false)
        }

    }, [isLoading]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let errorArray = []
        plansError !== '' && errorArray.push(plansError)
        yearError !== '' && errorArray.push(yearError)
        errorArray.length !== 0 && setError([...err, errorArray])
    }, [plansError, yearError]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchPlans(planYear, apiKey)
        setSelectedPlan(-1)
    }, [planYear]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageWrapper title="Сторінка плану">
            {err.length !== 0
                ? <MyError onClick={e => setError([])}>{err}</MyError>
                : <>
                    {isYearLoading
                        ? < MyLoader />
                        : <div className={myContentWrapper}>
                            <div className={myContentHeader}>
                                <div className={headerItem}>
                                    <MySelector
                                        options={options}
                                        selected={planYear}
                                        onChange={e => setPlanYear(Number(e.target.value))}
                                    />
                                </div>

                            </div>
                            <div className={contTableWrapper}>
                                {isPlanLoading
                                    ? <MyLoader />
                                    : <MyTable
                                        header={['ПІБ', 'ТДК', 'СТ', 'SW', 'ПМ']}
                                    >
                                        {plans.map(plan =>
                                            <PlanTR key={plan.id} selectedPlan={selectedPlan} selected={e => setSelectedPlan(e)} index={plan.id} option={plan} />
                                        )}

                                    </MyTable>
                                }
                            </div>
                            {selectedPlan === -1
                                ? <></>
                                :
                                <div className={myContentHeader}>
                                    {isAuth
                                        ? <div className={headerItem}>
                                            <MyButton
                                                onClick={AboutAndChange}
                                            >{`Редагувати`}</MyButton>
                                        </div>
                                        : <div className={headerItem}>
                                            <MyButton
                                                onClick={About}
                                            >{`Детальніше`}</MyButton>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </>
            }
        </PageWrapper >
    )
}

export default Plan;