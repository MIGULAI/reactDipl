import React from "react";
import MyModal from "../../UI/MyModal/MyModal";
import PropTypes from 'prop-types';
import ModalPublSearch from "./ModalPublSearch";
import { useState } from "react";
import ModalPutPubl from "./ModalPutPubl";


const ModalPutPublication = ({ visible, setVisible }) => {
    const [idPubl, setIdPubl] = useState(null)
    return <MyModal visible={visible} setVisible={setVisible}>
            {
                !idPubl
                    ? <ModalPublSearch setPublId={setIdPubl} />
                    : <ModalPutPubl id={idPubl} setPublId={setIdPubl} />
            }
        </MyModal>
    
}

ModalPutPublication.defaultProps = {
    visible: false
}

ModalPutPublication.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func
}



export default ModalPutPublication