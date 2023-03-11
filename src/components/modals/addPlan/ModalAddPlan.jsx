import React from "react";
import MyModal from "../../UI/MyModal/MyModal";
import PropTypes from 'prop-types';


const ModalAddPlan = ({visible, setVisible}) => {
    return (
        <MyModal  visible={visible} setVisible={setVisible}>
            Форма додання плану 
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