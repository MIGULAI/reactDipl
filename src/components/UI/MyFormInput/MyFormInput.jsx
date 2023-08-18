import React from "react";
import PropTypes from 'prop-types';
import classes from "../MyInput/MyInput.module.css"


function MyFormInput({placeholder = "", type = "text", register }) {
    const { myInput } = classes
    return <input className={myInput} type={type} placeholder={placeholder} {...register} />
}

MyFormInput.defaultProps = {
    placeholder: "",
    type: "text",
    value: ''
}

MyFormInput.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    register: PropTypes.object
}


export default MyFormInput