import React from "react";
import MyModal from "../../UI/MyModal/MyModal";
import PropTypes from 'prop-types';
import ModalAuthorSearch from "./ModalAuthorSearch";
import { useState } from "react";
import { useEffect } from "react";
import ModalChangeAuthor from "./ModalChangeAuthor";


const ModalPutAuthor = ({visible, setVisible}) => {
    const [idAuthor, setIdAuthor] = useState(null)
    const [searchVisible, setSearchVisible] = useState(true)
    const [/*err*/, setErr] = useState([])

    useEffect(() => {
        idAuthor !== null && setSearchVisible(false)
    }, [idAuthor])

    return (
        <MyModal  visible={visible} setVisible={setVisible}>
            {
                searchVisible 
                ?<ModalAuthorSearch setAuthorId={setIdAuthor} errCallback={setErr} />
                :<ModalChangeAuthor id={idAuthor} setAuthorId={setIdAuthor}  errCallback={setErr} />
            }
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