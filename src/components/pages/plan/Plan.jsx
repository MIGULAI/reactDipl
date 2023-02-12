import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import MyLoader from "../../UI/MyLoader/MyLoader";
import PageWrapper from "../PageWrapper";
import PostService from "../../../API/PostService";
import MyTable from "../../UI/MyTable/MyTable"

import classes from "./Plan.module.css"
import { useFetching } from "../../../hooks/useFetching";
import MySelector from "../../UI/MySelector/MySelector";
import { AuthContext } from "../../../context";
import { CheckYear } from "../../../utils/functions/CheckYear";
import PlanTR from "./PlanTR";
import MyButton from "../../UI/MyButton/MyButton";
import MyError from "../../UI/MyError/MyError";

const Plan = () => {
    const navig = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [planYear, setPlanYear] = useState(CheckYear())
    const [options, setOptions] = useState([{ value: '', str: '' }])
    const [nextYear, setNextYear] = useState(false)
    const [plans, setPlans] = useState([])
    const [selectedPlan, setSelectedPlan] = useState(-1)
    const [err, setError] = useState()

    const { isAuth, apiKey, setKeyActive } = useContext(AuthContext)


    const [fetchYears, isYearLoading, yearError] = useFetching(async () => {
        const response = await PostService.getPlanYearList()
        let yearsArray = response.data;
        let optionsArray = []
        for (let i = 0; i < yearsArray[0].length; i++) {
            let option = { value: Number(yearsArray[0][i].year_start), str: `${yearsArray[0][i].year_start} - ${yearsArray[1][i].year_end}` }
            optionsArray.push(option);
        }
        if (optionsArray[optionsArray.length - 1].value < planYear) {
            setPlanYear(optionsArray[optionsArray.length - 1].value)
        }
        setNextYear(optionsArray[optionsArray.length - 1].value + 1)
        setOptions(optionsArray);
    })

    const [fetchPlans, isPlanLoading, plansError] = useFetching(async (year, apiKey) => {
        const response = await PostService.getPlansByYear(year, apiKey)
        setPlans(JSON.parse(response.data[1]));
    })
    const createNewPlan = async () => {
        console.log('clicked');
        let response = await PostService.nextYearPlanCreate(nextYear, apiKey)
        if (response.data[0] === false) {
            setError(response.data[1])
        } else {
            setIsLoading(true)
        }
    }

    const About = () => {
        navig(`/plan/about/${selectedPlan}`)
    }
    const AboutAndChange = () => {
        navig(`/plan/change/${selectedPlan}`)
    }

    useEffect(() => {
        setKeyActive(0)
        fetchYears()
        setIsLoading(false)
    }, [isLoading])
    
    useEffect(() => {
        if (plansError !== undefined) setError(plansError)
        if (yearError !== undefined) setError(yearError)
    }, [plansError, yearError, err])

    useEffect(() => {
        fetchPlans(planYear, apiKey)
        setSelectedPlan(-1)
    }, [planYear])


    return (
        <PageWrapper title="Сторінка плану">
            {err
                ? <MyError>{err}</MyError>
                : <></>

            }
            {isYearLoading
                ? < MyLoader />
                : <div className={classes.myContent_wrapper}>
                    <div className={classes.myContent__header}>
                        <div className={classes.header_item}>
                            <MySelector
                                options={options}
                                selectedYear={planYear}
                                onChange={e => setPlanYear(Number(e.target.value))}
                            />
                        </div>
                        {isAuth
                            ? <div className={classes.header_item}>
                                <MyButton
                                    onClick={createNewPlan}
                                >{`Створити план на ${nextYear} - ${nextYear + 1} р.`}</MyButton> </div>
                            : <></>
                        }
                    </div>
                    <div className={classes.contTable__wrapper}>
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
                        <div className={classes.myContent__header}>
                            {isAuth
                                ? <div className={classes.header_item}>
                                    <MyButton
                                        onClick={AboutAndChange}
                                    >{`Редагувати`}</MyButton>
                                </div>
                                : <div className={classes.header_item}>
                                    <MyButton
                                        onClick={About}
                                    >{`Детальніше`}</MyButton>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </PageWrapper >
    )
}

export default Plan;