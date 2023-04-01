import React from "react";
import PropTypes from 'prop-types';
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import PlanModalChecker from "../../pages/editorPage/modals/PlanModalChecker";

const ModalPlanControl = ({isLoading, savePlan, cencelPlans, newPlans,setNewPlans}) => {
    return (
        <>
            {
                isLoading
                ? <MyFileLoader/>
                :<PlanModalChecker 
                    saveFunc={e => savePlan(newPlans)} 
                    cancelFunc={cencelPlans} 
                    newPlans={newPlans} 
                    setPlans={setNewPlans} />
            }
        </>
    )
}

ModalPlanControl.defaultProps = {
    isLoading: true
}

ModalPlanControl.propTypes = {
    isLoading: PropTypes.bool,
    savePlan: PropTypes.func,
    cancelFunc: PropTypes.func,
    newPlans: PropTypes.array,
    setNewPlans: PropTypes.func
}

export default ModalPlanControl