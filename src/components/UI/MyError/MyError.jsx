import React from "react";

import classes from './MyError.module.css'

const MyError = ({children}) => {
    return (
        <div className={classes.myError} >{children}</div>
    );
}

export default MyError;