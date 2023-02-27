import React from "react";
import classes from "./PlanTR.module.css"

const PlanTR = ({ option, index, selected, selectedPlan }) => {

    let paint = ''
    if(!option.Stat && index !== selectedPlan){
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
            <td className={classes.item}>
                <span>{option.AuthorPatronic !== '' ? `${option.AuthorSerName} ${option.AuthorName[0]}.  ${option.AuthorPatronic[0]}. `: `${option.AuthorSerName} ${option.AuthorName[0]}.`}</span>
            </td>
            <td className={classes.item}>
                <span>{option.Theses}</span>
            </td>
            <td className={classes.item}>
                <span>{option.ProfetionalArticles}</span>
            </td>
            <td className={classes.item}>
                <span>{option.Scopus}</span>
            </td>
            <td className={classes.item}>
                <span>{option.Manuals}</span>
            </td>
        </tr>
    );
}
export default PlanTR;