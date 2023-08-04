import React from "react";
import MyModal from "../../UI/MyModal/MyModal";
import PropTypes from 'prop-types';
import ModalPublSearch from "./ModalPublSearch";
import { useState } from "react";
import { useEffect } from "react";
import ModalPutPubl from "./ModalPutPubl";


const ModalPutPublication = ({visible, setVisible}) => {
    const [idPubl, setIdPubl] = useState(null)
    const [searchVisible, setSearchVisible] = useState(true)
    const [/*err*/, setErr] = useState([])

    useEffect(() => {
        idPubl !== null && setSearchVisible(false)
    }, [idPubl])

    return (
        <MyModal  visible={visible} setVisible={setVisible}>
            {
                searchVisible 
                ?<ModalPublSearch setPublId={setIdPubl} errCallback={setErr} />
                :<ModalPutPubl id={idPubl} setPublId={setIdPubl} errCallback={setErr}/>
            }
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