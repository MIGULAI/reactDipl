import React from "react";
import PropTypes from 'prop-types';
import classes from "../MyInput/MyInput.module.css"
import InputMask from 'react-input-mask';

function MyFormInput({ placeholder = "", type = "text", register, mask }) {
    const { myInput } = classes
    if (mask) {
        return <InputMask  className={myInput} mask={mask} type={type} placeholder={placeholder} {...register} />

    } else {
        return <input className={myInput} type={type} placeholder={placeholder} {...register} />

    }
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