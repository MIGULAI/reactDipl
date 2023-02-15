import React from "react";

const MySelector =({options, selected, onChange}) =>{
    return (
        <select 
            value={selected}
            onChange={onChange}
        >
            {options.map( option => 
                <option key={option.value} value={option.value} >{option.str}</option>
                )}
        </select>
    )
}

export default MySelector;