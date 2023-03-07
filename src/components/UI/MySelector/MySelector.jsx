import React from "react";
import PropTypes from 'prop-types';


const MySelector = ({ options, selected, onChange }) => {
    return (
        <select
            value={selected}
            onChange={onChange}
        >
            {options.map((option , i) =>
                <option key={option.value ? option.value : i} value={option.value ? option.value : i} >{option.str}</option>
            )}
        </select>
    )
}

MySelector.defaultProps = {
    selected: 0
}

MySelector.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    selected: PropTypes.number,
    onChange: PropTypes.func
}

export default MySelector;