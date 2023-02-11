import React from "react";
import classes from "./PageWrapper.module.css"

const PageWrapper = ({ children , title }) => {
    return (
        <div className={classes.PG__wrapper}>
            <div className={classes.page__title}>
                {title}
            </div>
            <div className={classes.sub__wrapper}>
                {children}
            </div>
        </div>
    )
}

export default PageWrapper;