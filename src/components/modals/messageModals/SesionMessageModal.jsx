import React from "react";
import PropTypes from "prop-types";
import classes from './MessageStatuses.module.css'

const SesionMessage = ({ messageArray, classesArray }) => {
    return (
        <>
            {
                messageArray && classesArray && messageArray.map((message, i) => <span className={classes[classesArray[i]]} key={i}>
                    {message}
                </span>)
            }
        </>
    )
}

SesionMessage.defaultProps = {
    messageArray: ['Message Placeholder'],
}

SesionMessage.propTypes = {
    messageArray: PropTypes.arrayOf(PropTypes.string),
    classesArray: PropTypes.arrayOf(PropTypes.string)
}

export default SesionMessage