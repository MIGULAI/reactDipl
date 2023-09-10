import React from "react";
import PropTypes from 'prop-types';


const MySelector = ({ options, selected, onChange }) => {
    return (
        <select
            // value={selected}
            defaultValue={0}
            onChange={onChange}
        >
            <option value={0}  disabled={true}>{'Виберіть'}</option>
            {options.map((option, i) =>
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
    onChange: PropTypes.func
}

export default MySelector;