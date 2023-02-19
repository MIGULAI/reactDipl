import React from "react";
import PropTypes from 'prop-types';

import classes from "./MyButton.module.css"

const MyButton = ({ children, buttonType, ...props }) => {
    const { myBtn } = classes
    return (
        <button className={myBtn} type={buttonType} {...props}>
            {children}
        </button>
    )
}

MyButton.defaultProps = {
    children: null,
    buttonType: "submit"
}

MyButton.propTypes  = {
    children: PropTypes.string,
    buttonType: PropTypes.string
}

export default MyButton