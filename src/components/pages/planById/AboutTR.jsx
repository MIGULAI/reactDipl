import React from "react";
import classes from "./AboutTR.module.css";

const AboutTR = ({option, index, selected, selectedItem}) =>{

    let paint = ''

    if (index === selectedItem) {
        paint += classes.isSelected
    }
    

    const selecting = () => {
        if (index !== selectedItem) {
            selected(index)
        } else {
            selected(-1)
        }
    }

    return(
        <tr className={paint} onClick={selecting}>
            <td>
                <span>{option.Publication_Name}</span>
            </td>
            <td>
                <span>{option.Type}</span>
            </td>
            <td>
                <span>{option.Language}</span>
            </td>
            <td>
                <span>{option.Publication_Date}</span>
            </td>
        </tr>
    )
}

export default AboutTR;