import React from "react";
import MyModal from "../../UI/MyModal/MyModal";
import PropTypes from 'prop-types';


const ModalPutPlan = ({visible, setVisible}) => {
    return (
        <MyModal  visible={visible} setVisible={setVisible}>
            Форма редагування плану
        </MyModal>
    )
}

ModalPutPlan.defaultProps = {
    visible: false
}

ModalPutPlan.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func
}



export default ModalPutPlan