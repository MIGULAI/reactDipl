import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalAddPlan from "../../modals/addPlan/ModalAddPlan";
import ModalPutAuthor from "../../modals/putAuthor/ModalPutAuthor";
import ModalPutPlan from "../../modals/putPlan/ModalPutPlan";
import ModalPutPublication from "../../modals/putPubl/ModalPutPublication";
import Key from "./Key";
import classes from "./MyActions.module.css"

const MyActions = ({ isAuth, ...props }) => {
    const [modalAutorVisible, setModalAuthorVisible] = useState(false)
    const [modalPublVisible, setModalPublVisible] = useState(false)
    const [modalAddPlanVisible, setModalAddPlanVisible] = useState(false)
    const [modalPutPlanVisible, setModalPutPlanVisible] = useState(false)
    const navig = useNavigate();
    return (
        <>
            { 
                modalAutorVisible && <ModalPutAuthor visible={modalAutorVisible} setVisible={setModalAuthorVisible} />
            }
            { 
                modalPublVisible && <ModalPutPublication visible={modalPublVisible} setVisible={setModalPublVisible} />
            }
            { 
                modalAddPlanVisible && <ModalAddPlan visible={modalAddPlanVisible} setVisible={setModalAddPlanVisible} />
            }
            { 
                modalPutPlanVisible && <ModalPutPlan visible={modalPutPlanVisible} setVisible={setModalPutPlanVisible} />
            }
            <div className={classes.bar} {...props}>
                <Key lable={'Додати/Редагувати автора'} actionPlus={() => navig('/add/autor')} actionPut={() => setModalAuthorVisible(true)} />
                <Key lable={'Додати/Редагувати публікацію'} actionPlus={() => navig('/add/public')} actionPut={() => setModalPublVisible(true)} />
                <Key lable={'Додати/Редагувати план'} actionPlus={() => setModalAddPlanVisible(true)} actionPut={() => navig('/plan')} />
            </div>
        </>

    )
}

MyActions.defaultProps = {
    isAuth: false,
}

export default MyActions;