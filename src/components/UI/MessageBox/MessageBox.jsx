import React from "react";
import classes from "./MessageBox.module.css"
import PropTypes from 'prop-types';

const MessageBox = ({ visible, setVisible, canClouse, children }) =>{
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

MessageBox.defaultProps = {
    visible: false,
    canClouse: true
}

MessageBox.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    canClouse: PropTypes.bool
}


export default MessageBox