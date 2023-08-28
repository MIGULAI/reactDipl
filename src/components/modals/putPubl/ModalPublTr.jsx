import React from "react";

import classes from "./ModalPublTr.module.css"

const ModalPublTr = ({ option, index, selected, selectedItem }) => {
    const selecting = () => index !== selectedItem ? selected(index) : selected(null)
    return (
        <tr className={index === selectedItem ? classes.isSelected : ""} onClick={selecting}>
            <td>
                <span>{option.Name}</span>
            </td>
            <td>
                <span>{new Date(option.PublicationDate).toLocaleDateString()}</span>
            </td>

        </tr>
    )
}

export default ModalPublTr