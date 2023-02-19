import React from "react";
import PropTypes from 'prop-types';

import classes from "./MyLabel.module.css";

const MyLabel = ({children, htmlFor, ...props}) => {
    const {myLable} = classes
    return(
        <label className={myLable} htmlFor={htmlFor} {...props}>
            {children}
        </label>
    )
}

MyLabel.defaultProps = {
    htmlFor: ""
}

MyLabel.propTypes = {
    children: PropTypes.string.isRequired,
    isFor: PropTypes.string
}

export default MyLabel;