import React from "react";
import PropTypes from 'prop-types';

import classes from "./MyInput.module.css"

const MyInput = ({placeholder = "", type = "text" , ...props}) => {
    const {myInput} = classes

    return (
        <input className={myInput} type={type} placeholder={placeholder} {...props} />
    );
}

MyInput.defaultProps = {
    placeholder: "",
    type: "text",
    value: ''
}

MyInput.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string
}

export default MyInput;