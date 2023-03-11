import React from "react";
import MyModal from "../../UI/MyModal/MyModal";
import PropTypes from 'prop-types';


const ModalPutAuthor = ({visible, setVisible}) => {
    return (
        <MyModal  visible={visible} setVisible={setVisible}>
            Форма редагування автора    
        </MyModal>
    )
}

ModalPutAuthor.defaultProps = {
    visible: false
}

ModalPutAuthor.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func
}



export default ModalPutAuthor