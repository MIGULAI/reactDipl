import React from "react";
import classes from "./AboutTR.module.css";

const AboutTR = ({option, index, selected, selectedItem, setup}) =>{

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
                <span>{setup.types.find(element => element.id ===  option.Type).TypeShortName}</span>
            </td>
            <td>
                <span>{setup.languages.find(element => element.id ===  option.Language).LanguageShortName}</span>
            </td>
            <td>
                <span>{new Date(option.PublicationDate).toLocaleDateString()}</span>
            </td>
        </tr>
    )
}

export default AboutTR;