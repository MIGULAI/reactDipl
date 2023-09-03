import React from "react";
import classes from "./MyModal.module.css"
import PropTypes from 'prop-types';
import CloseIcon from "../../../resources/jsx/CloseIcon";

const MyModal = ({ visible, setVisible, canClouse, onClose, children, zIndex = 888 }) => {
    const { modal, active, modalContent } = classes

    const rootClasses = `${modal} ${visible ? active : ''}`;

    const clouse = () => {
        canClouse && setVisible(false)
        onClose && onClose()
    }
    return (
        <div className={rootClasses} style={{ zIndex: zIndex }} onClick={() => clouse()}>
            <div className={modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={classes.modalHeader}>
                    <div className={classes.imgWrapper}>
                        <span className={classes.exitSVG} onClick={() => clouse()} ><CloseIcon /></span>
                    </div>
                </div>
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
    canClouse: PropTypes.bool,
    onClose: PropTypes.func
}

export default MyModal