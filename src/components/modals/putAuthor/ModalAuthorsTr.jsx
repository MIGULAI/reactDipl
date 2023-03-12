import React from "react";
import classes from "./ModalAuthorsTr.module.css"

const ModalAuthorsTr = ({ option, index, selected, selectedItem }) => {
    const selecting = () => index !== selectedItem ? selected(index) : selected(null)

    return (
        <tr className={index === selectedItem ? classes.isSelected : ""} onClick={selecting}>
            <td>
                <span>{option.Name}</span>
            </td>
            <td>
                <span>{option.SerName}</span>
            </td>
            <td>
                <span>{option.Patronic}</span>
            </td>
        </tr>
    )
}

export default ModalAuthorsTr