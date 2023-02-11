import React from "react";
import classes from "./MyLable.module.css";

const MyLable = ({children, ...props}) => {
    return(
        <p className={classes.myLable} {...props}>
            {children}
        </p>
    )
}

export default MyLable;