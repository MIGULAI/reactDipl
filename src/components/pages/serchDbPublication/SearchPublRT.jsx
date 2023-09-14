import React from "react";
import PropTypes from 'prop-types';
import classes from "../searchDB/SearchTR.module.css";

const SearchPublRT = ({ option, index, subIndex, selected, selectedItem }) => {
    const selecting = () => index !== selectedItem ? selected(index) : selected(null)
    return <tr className={index === selectedItem ? classes.isSelected : ""} onClick={selecting}>
        <td style={{ textAlign: 'center' }}>
            <span>{subIndex + 1}</span>
        </td>
        <td>
            <span>{option.Name}</span>
        </td>
        <td>
            <span>{option.UPP}</span>
        </td>
        <td>
            <span>{new Date(option.PublicationDate).toLocaleDateString()}</span>
        </td>
    </tr>
}

SearchPublRT.defaultProps = {
    option: {},
    index: 0,
    selectedItem: null
}
SearchPublRT.propTypes = {
    option: PropTypes.object,
    index: PropTypes.number.isRequired,
    selected: PropTypes.func.isRequired,
    selectedItem: PropTypes.number
}


export default SearchPublRT