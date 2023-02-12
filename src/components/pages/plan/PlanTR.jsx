import React from "react";
import classes from "./PlanTR.module.css"

const PlanTR = ({ option, index, selected, selectedPlan }) => {

    let paint = ''
    if(!option.status && index !== selectedPlan){
        paint += classes.isFalse
    }
    if (index === selectedPlan) {
        paint += classes.isSelected
    }
    

    const selecting = () => {
        if (index !== selectedPlan) {
            selected(index)
        } else {
            selected(-1)
        }
    }


    return (
        <tr className={paint} onClick={selecting}>
            <td>
                <span>{option.autor}</span>
            </td>
            <td>
                <span>{option.theses}</span>
            </td>
            <td>
                <span>{option.professional_articles}</span>
            </td>
            <td>
                <span>{option.scopus}</span>
            </td>
            <td>
                <span>{option.manuals}</span>
            </td>
        </tr>
    );
}
export default PlanTR;