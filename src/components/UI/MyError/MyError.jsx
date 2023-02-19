import React from "react";
import PropTypes from 'prop-types';

import classes from './MyError.module.css'

const MyError = ({ children, ...props }) => {
    const { myError} = classes
    return (
        <div className={myError} {...props}>
            {
                children.map((child, i) => <span key={i}>{child}</span>)
            }
        </div>
    )
}

MyError.defaultProps = {
    children: []
}

MyError.propTypes = {
    children: PropTypes.array
}

export default MyError;