import React from "react";
import PropTypes from 'prop-types';

import classes from "./MyButton.module.css"

const MyButton = ({ children, buttonType, disabled, ...props }) => {
    const { myBtn } = classes
    return (
        <button className={myBtn} type={buttonType} disabled={disabled} {...props}>
            {children}
        </button>
    )
}

MyButton.defaultProps = {
    children: null,
    buttonType: "submit",
    disabled : false
}

MyButton.propTypes  = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    buttonType: PropTypes.string,
    disabled: PropTypes.bool
}

export default MyButton