import React from "react";
import MyModal from "../../UI/MyModal/MyModal";
import PropTypes from 'prop-types';


const ModalPutPublication = ({visible, setVisible}) => {
    return (
        <MyModal  visible={visible} setVisible={setVisible}>
            Форма редагування публікації 
        </MyModal>
    )
}

ModalPutPublication.defaultProps = {
    visible: false
}

ModalPutPublication.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func
}



export default ModalPutPublication