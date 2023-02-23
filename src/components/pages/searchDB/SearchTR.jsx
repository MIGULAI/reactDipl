import React from "react";
import PropTypes from 'prop-types';
import classes from "./SearchTR.module.css";

const SearchTR = ({ option, index, selected, selectedItem }) => {

    const selecting = () => index !== selectedItem ? selected(index) : selected(null)


    return (
        <tr className={index === selectedItem ? classes.isSelected : ""} onClick={selecting}>
            <td>
                <span>{option.SerName}</span>
            </td>
            <td>
                <span>{option.Name}</span>
            </td>
            <td>
                <span>{option.Patronic}</span>
            </td>
            <td>
                <span>{option.OrganizationName}</span>
            </td>
            <td>
                <span>{option.DegreeName}</span>
            </td>
            <td>
                <span>{option.RankName}</span>
            </td>
            <td>
                <span>{option.Email}</span>
            </td>
        </tr>
    )
}

SearchTR.defaultProps = {
    option: {},
    index: 0,
    selectedItem: null
}
SearchTR.propTypes = {
    option: PropTypes.object,
    index: PropTypes.number.isRequired,
    selected: PropTypes.func.isRequired,
    selectedItem: PropTypes.number
}

export default SearchTR