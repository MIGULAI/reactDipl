import React from "react";
import PropTypes from 'prop-types';


const MySelector = ({ options, selected, onChange }) => {
    return (
        <select
            value={selected}
            onChange={onChange}
        >
            {options.map(option =>
                <option key={option.value} value={option.value} >{option.str}</option>
            )}
        </select>
    )
}

MySelector.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    selected: PropTypes.number
}

export default MySelector;