import React from "react";
import classes from "./MyTable.module.css"
import PropTypes from 'prop-types';


const MyTable = ({ children, header}) => {
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

MyTable.defaultProps = {
    children: null,
    header: []
}

MyTable.propTypes  = {
    header: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default MyTable