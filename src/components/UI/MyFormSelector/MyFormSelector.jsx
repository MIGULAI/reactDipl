import React from "react";
import PropTypes from 'prop-types';
import classes from './MyFormSelector.module.css'

const MyFormSelector = ({ options, register }) => {
    return (
        <select
            className={classes.selector}
            {...register}
        >
            {options.map((option, i) =>
                <option key={option.value ? option.value : i} value={option.value ? option.value : i} >{option.str}</option>
            )}
        </select>
    )
}

MyFormSelector.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    register: PropTypes.object
}

export default MyFormSelector