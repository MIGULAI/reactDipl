import React, { useState, useEffect } from "react";
import MyLoader from "../../UI/MyLoader/MyLoader";
import PageWrapper from "../PageWrapper";

import classes from "./Plan.module.css"

const Plan = () => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

    }, [])


    return (
        <PageWrapper title="Сторінка плану">
            {isLoading
                ? < MyLoader />
                : <div className={classes.myContent_wrapper}>
                    hello World
                    <div className={classes.myContent__header}>
                        <div className={classes.header_item}> Element 1 </div>
                        <div className={classes.header_item}> Element 2 </div>
                    </div>
                </div>
            }
        </PageWrapper>
    )
}

export default Plan;