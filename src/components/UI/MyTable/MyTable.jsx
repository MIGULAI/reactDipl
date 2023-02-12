import React from "react";
import classes from "./MyTable.module.css"

const PlanTable = ({ children, header}) => {
    return (
        <table className={classes.myTable}>
            <tbody>
                <tr>
                    {
                        header.map(elem =>
                            <td key={elem}>
                                <span>{elem}</span>
                            </td>
                        )
                    }

                </tr>
                {children}

            </tbody>
        </table>
    );
}

export default PlanTable