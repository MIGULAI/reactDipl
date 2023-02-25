import React from "react";
import classes from "./MyModal.module.css"
import PropTypes from 'prop-types';


const MyModal = ({ visible, setVisible, children }) => {
    const {modal, active, modalContent} = classes

    const rootClasses = `${modal} ${visible ? active : ''}`;

    return (
        <div className={rootClasses} onClick={() => setVisible(false)}>
            <div className={modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

MyModal.defaultProps = {
    visible: false,
}

MyModal.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
}

export default MyModal