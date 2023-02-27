import React from "react";
import PropTypes from 'prop-types';
import classes from "./MySuccess.module.css"

const MySuccess = ({children}) => {
    return (
        <div className={classes.success}>
            {children}
        </div>  
    )
}

MySuccess.defaultProps ={
    children: ''
}

MySuccess.propTypes = {
    children: PropTypes.string
}

export default MySuccess