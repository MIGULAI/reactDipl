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
                <span>{option.Name}</span>
            </td>
            <td>
                <span>{option.TypeName}</span>
            </td>
            <td>
                <span>{option.LanguageName}</span>
            </td>
            <td>
                <span>{new Date(option.PublicationDate).toLocaleDateString()}</span>
            </td>
        </tr>
    )
}

export default AboutTR;