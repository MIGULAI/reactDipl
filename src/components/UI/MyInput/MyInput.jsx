import React from "react";

import classes from "./MyInput.module.css"



const MyInput = ({placeholder, type, ...props}) => {
    return (
        <input className={classes.myInput}  type={type} placeholder={placeholder} {...props} />
    );
}

export default MyInput;