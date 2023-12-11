import React, { useContext, useEffect, useState } from "react";
import MyLoader from "../../UI/MyLoader/MyLoader";
import PageWrapper from "../PageWrapper";
import classes from "./Editor.module.css"
import { AuthContext } from "../../../context";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyError from "../../UI/MyError/MyError";
import Recalculate from "./SubFunctions/Recalculate";
import MyActions from "../../UI/MyActionKeys/MyActions";
import MyStats from "../../UI/MyStats/MyStats";

const Editor = () => {
    const { statBar, item } = classes
    const { isAuth, accessToken, setKeyActive, globalSetup, setGlobalSetup } = useContext(AuthContext)
    const [authorsPublCount, setAuthorsPublCount] = useState(Number(globalSetup.authorsPublCount))
    const [err, setErr] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [setAuthorNumber, , numbErr] = useFetching(async () => {
        const response = await PostService.putMaxAuthors(accessToken, authorsPublCount)
        console.log(response);
        if (response.data.success) setGlobalSetup({ ...globalSetup, authorsPublCount: authorsPublCount })
        else setErr([...err, response.data.message])
    })
    const handleAuthorsNumber = () => {
        setAuthorNumber()
    }
    useEffect(() => {
        numbErr && console.log(numbErr);
    }, [numbErr])
    useEffect(() => {
        setKeyActive(0)
        setIsLoading(false)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <PageWrapper title={"Сторінка адміністратора"}>
            {err.length !== 0 && <MyError onClick={() => setErr([])}>{err}</MyError>}
            {
                isLoading
                    ? <MyLoader />
                    : <div>
                        <MyStats setBoboErr={setErr} />

                        <div className={statBar}>
                            <div className={item}>
                                <Recalculate accessToken={accessToken} />
                            </div>
                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                {/* <DepAuthors /> */}
                            </div>
                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                <MyActions isAuth={isAuth} />
                            </div>
                        </div>
                    </div>
            }
        </PageWrapper>
    )
}

export default Editor;