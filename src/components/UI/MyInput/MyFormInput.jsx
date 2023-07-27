import React from "react";
import PropTypes from 'prop-types';

import classes from "./MyInput.module.css"

const MyFormInput = ({placeholder = "", type = "text" , register,  ...props}) => {
    const {myInput} = classes

    return (
        <input className={myInput} type={type} placeholder={placeholder} {...register} {...props} />
    );
}

MyFormInput.defaultProps = {
    placeholder: "",
    type: "text"
}

MyFormInput.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string
}

export default MyFormInput;