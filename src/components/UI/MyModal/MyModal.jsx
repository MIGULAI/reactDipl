import React from "react";
import classes from "./MyModal.module.css"
import PropTypes from 'prop-types';
import close from '../../../resources/svg/close.svg'

const MyModal = ({ visible, setVisible, canClouse, onClose, children, zIndex = 888 }) => {
    const { modal, active, modalContent } = classes

    const rootClasses = `${modal} ${visible ? active : ''}`;

    const clouse = () => {
        canClouse && setVisible(false)
        onClose && onClose()
    }
    return (
        <div className={rootClasses} style={{zIndex: zIndex}} onClick={() => clouse()}>
            <div className={modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={classes.modalHeader}>
                    <div className={classes.imgWrapper}>
                        <img className={classes.exitSVG} onClick={() => clouse()} src={close} alt="Закрити вікно" />
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