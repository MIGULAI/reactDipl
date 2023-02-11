import React from "react";
import classes from './MyLoader.module.css'

const MyLoader = () => {
    return (
        <div class={classes.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
}

export default MyLoader