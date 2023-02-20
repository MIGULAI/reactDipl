import React from "react";
import PropTypes from 'prop-types';
import classes from "./SearchTR.module.css";

const SearchTR = ({ option, index, selected, selectedItem }) => {

    const selecting = () => index !== selectedItem ? selected(index) : selected(null)


    // console.log(option);
    return (
        <tr className={index === selectedItem ? classes.isSelected : ""} onClick={selecting}>
            <td>
                <span>{option.Last_Name}</span>
            </td>
            <td>
                <span>{option.First_Name}</span>
            </td>
            <td>
                <span>{option.Patronic}</span>
            </td>
            <td>
                <span>{option.Organization}</span>
            </td>
            <td>
                <span>{option.Scientific_Degree}</span>
            </td>
            <td>
                <span>{option.Scientific_Rank}</span>
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