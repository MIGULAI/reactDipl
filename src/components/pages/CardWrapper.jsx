import React from "react";
import classes from "./CardWrapper.module.css"
import PropTypes from 'prop-types';


const CardWrapper = ({children}) => {
    return (
        <div className={classes.card}>
            {children}
        </div>
    );
}

CardWrapper.defaultProps = {
    children: null
}

CardWrapper.propTypes = {
    children: PropTypes.element.isRequired,
  };

export default CardWrapper