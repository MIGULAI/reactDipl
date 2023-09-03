import React from "react";
import { useState } from "react";
import PostService from "../../../../API/PostService";
import { useFetching } from "../../../../hooks/useFetching";
import MyButton from "../../../UI/MyButton/MyButton";
import MyModal from "../../../UI/MyModal/MyModal";
import SuccessModal from "../modals/SuccessModal";
import PropTypes from 'prop-types';
import { useEffect } from "react";

const Recalculate = ({ accessToken }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [mes, setMes] = useState('')
    const [err , setErr] = useState([])
    const [handlePlanCalculation, isPlansCalcing, calcErr, setCalcErr] = useFetching(async () => {
        setModalVisible(true)
        const response = await PostService.calculatePlans(accessToken)
        setMes(response.data.message)
        console.log(response.data);
    })

    useEffect(() => {
        calcErr !== '' && setErr([calcErr])
    }, [calcErr]) 

     useEffect(() => {
        setCalcErr('')
        setErr([])
     }, [modalVisible]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <MyModal visible={modalVisible} canClouse={!isPlansCalcing} setVisible={setModalVisible}>
                <SuccessModal loader={isPlansCalcing} err={err}>
                    {mes}
                </SuccessModal>
            </MyModal>
            <MyButton onClick={() => handlePlanCalculation()}>Прорахунок планів</MyButton>
        </>
    )
}

Recalculate.defaultProps = {
    accessToken: null
}

Recalculate.propTypes = {
    accessToken: PropTypes.string
}

export default Recalculate