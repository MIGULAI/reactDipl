import React from "react";
import classes from "./MyModal.module.css"
import PropTypes from 'prop-types';


const MyModal = ({ visible, setVisible, canClouse, children }) => {
    const {modal, active, modalContent} = classes

    const rootClasses = `${modal} ${visible ? active : ''}`;

    const clouse = () => {
        canClouse && setVisible(false)
    }

    return (
        <div className={rootClasses} onClick={() => clouse()}>
            <div className={modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

MyModal.defaultProps = {
    visible: false,
    canClouse: true
}

MyModal.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    canClouse: PropTypes.bool
}

export default MyModal