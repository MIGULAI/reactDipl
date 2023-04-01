import React, { useState } from "react";
import MyModal from "../../UI/MyModal/MyModal";
import PropTypes from 'prop-types';
import MyButton from "../../UI/MyButton/MyButton";
import MyLabel from "../../UI/MyLabel/MyLabel";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import PlanModalChecker from "../../pages/editorPage/modals/PlanModalChecker";
import classes from "../../pages/editorPage/Editor.module.css"
import { CheckYear } from "../../../utils/functions/CheckYear";
import ModalPlanControl from "./ModalPlanControl";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";


const ModalAddPlan = ({ visible, setVisible }) => {
    const [modalPlan, setModalPlan] = useState(false)
    const [newPlans, setNewPlans] = useState([])
    const { accessToken } = useContext(AuthContext)
    const { statBar, item } = classes
    const [defaultYear, setDefaultYear] = useState(() => CheckYear())
    const [posibleYears, setPossibleYears] = useState([])

    const [fetchPlansYear, isYearFetching, yearErr] = useFetching(async () => {
        const response = await PostService.fetchPlanYearList();
        let years = response.data.data.years
        // let years = [2022, 2024]
        for (let i = 0; i < years.length; i++) {
            years[i] = Number(years[i])
        }
        // console.log(years);
        let posibleYears = []
        let start = Math.max(...years)
        // console.log(max);
        // let start = parseInt(years[0], 10)
        for (let i = 0; i < years.length; i = i) {
            start += 1;
            (start !== Number(years[i]) && start < Number(years[years.length - 1])) ? posibleYears.push(start) : ++i
        }
        let j = 0
        for (let i = years[0]; i < years[years.length - 1]; i++) {
            if (i !== years[j]) {
                posibleYears.push(i)
            } else {
                j++
            }
        }
        for (let i = Number(years[years.length - 1]) + 1; i <= Number(years[years.length - 1]) + 5; i++) {
            posibleYears.push(i)
        }
        setPossibleYears(posibleYears)
    })
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


    const cencelPlans = () => {
        setModalPlan(false)
        setNewPlans([])
    }

    const createPlan = (year, status) => {
        setModalPlan(true)
        createPlanFetching(year, status)
    }
    return (
        <MyModal visible={visible} setVisible={setVisible}>
            {

                isYearFetching
                    ? <MyFileLoader />
                    : <>
                        {
                            modalPlan
                                ? <ModalPlanControl
                                    isLoading={(isPlanCreating || isPlanSaving)}
                                    savePlan={savePlan}
                                    cancelPlans={cencelPlans}
                                    newPlans={newPlans}
                                    setNewPlans={setNewPlans}
                                />
                                : <>
                                    <div className={statBar}>
                                        <div className={item}>
                                            <MyLabel>Створення плану на поточний рік :</MyLabel>
                                            <MyButton onClick={e => createPlan(defaultYear, false)}>{`створити план на ${defaultYear}`}</MyButton>
                                        </div>
                                        <div className={item}>
                                            <MyLabel>Роки з відсутнім планом :</MyLabel>
                                            <MyButton onClick={fetchPlansYear}>Завантажити</MyButton>
                                            {/* <MySelector   /> */}
                                        </div>
                                    </div>
                                </>
                        }
                    </>
            }

        </MyModal>
    )
}

ModalAddPlan.defaultProps = {
    visible: false
}

ModalAddPlan.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func
}



export default ModalAddPlan