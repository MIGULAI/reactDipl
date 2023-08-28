import React, { useState } from "react";
import MyModal from "../../UI/MyModal/MyModal";
import PropTypes from 'prop-types';
import MyButton from "../../UI/MyButton/MyButton";
import MyLabel from "../../UI/MyLabel/MyLabel";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import classes from "../../pages/editorPage/Editor.module.css"
import { CheckYear } from "../../../utils/functions/CheckYear";
import ModalPlanControl from "./ModalPlanControl";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import { useEffect } from "react";
import MySelector from "../../UI/MySelector/MySelector";

const ModalAddPlan = ({ visible, setVisible }) => {
    const [modalPlan, setModalPlan] = useState(false)
    const [newPlans, setNewPlans] = useState([])
    const { accessToken, setMessageArray, setMessageClasses, setMessageModalVisible } = useContext(AuthContext)
    const { statBar, item } = classes
    const [defaultYear, setDefaultYear] = useState(() => CheckYear())
    const [optionsYear, setOptionsYear] = useState([])

    const [fetchPlansYear, isYearFetching, yearErr] = useFetching(async () => {
        const response = await PostService.fetchPlanYearList();
        let years = response.data.data.years
        for (let i = 0; i < years.length; i++) {
            years[i] = Number(years[i])
        }
        let posibleYears = []
        for (let y = defaultYear; posibleYears.length <= 5 && y > defaultYear - 5; y--) {
            if (!years.includes(y)) {
                posibleYears.push(y)
            }
        }
        if (posibleYears.length < 5) {
            for (let y = defaultYear; posibleYears.length < 5; y++) {
                if (!years.includes(y)) {
                    posibleYears.push(y)
                }
            }
            const optionsYears = posibleYears.map(year => { return { value: year, str: year } })
            setOptionsYear(optionsYears)
        }

        setDefaultYear(posibleYears.sort()[0])
    })

    const [createPlanFetching, isPlanCreating, createErr] = useFetching(async (year) => {
        const response = await PostService.createPlanOnYear(accessToken, year)
        if (response.data.success) {
            setNewPlans(response.data.data.plans)
        } else {
            setVisible(false)
            setMessageModalVisible(true)
            setMessageArray([response.data.message])
            setMessageClasses(['error'])
        }
    })

    const [savePlan, isPlanSaving, saveErr] = useFetching(async (plan) => {
        const response = await PostService.savePlan(accessToken, plan)
        setVisible(false)
        setMessageModalVisible(true)
        setMessageArray([response.data.message])
        if (response.data.success) {
            setMessageClasses(['message'])
            setNewPlans([])
            setModalPlan(false)
        } else {
            setMessageClasses(['error'])

        }
    })

    const cancelPlans = () => {
        setModalPlan(false)
        setNewPlans([])
    }

    const createPlan = (year, status) => {
        setModalPlan(true)
        createPlanFetching(year, status)
    }

    useEffect(() => {
        fetchPlansYear()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        saveErr && console.log(saveErr);
        createErr && console.log(createErr);
        yearErr && console.log(yearErr);
    }, [saveErr, createErr, yearErr])

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
                                    cancelPlans={cancelPlans}
                                    newPlans={newPlans}
                                    setNewPlans={setNewPlans}
                                />
                                : <>
                                    <div className={statBar}>
                                        <div className={item}>
                                            <MyLabel>Створення плану на рік :</MyLabel>
                                            <MySelector options={optionsYear} selected={defaultYear} onChange={(e) => setDefaultYear(e.target.value)} />
                                            <MyButton onClick={() => createPlan(defaultYear, false)}>{`створити план на ${defaultYear}`}</MyButton>
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