import React from "react";

const MySelector =({options, selectedYear, onChange}) =>{
    return (
        <select 
            value={selectedYear}
            onChange={onChange}
        >
            {options.map( option => 
                <option key={option.value} value={option.value} >{option.str}</option>
                )}
        </select>
    )
}

export default MySelector;