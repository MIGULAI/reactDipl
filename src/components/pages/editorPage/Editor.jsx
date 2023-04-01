import React, { useContext, useEffect, useState } from "react";
import MyInput from "../../UI/MyInput/MyInput";
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyLoader from "../../UI/MyLoader/MyLoader";
import PageWrapper from "../PageWrapper";
import classes from "./Editor.module.css"
import { AuthContext } from "../../../context";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyError from "../../UI/MyError/MyError";
import MyButton from "../../UI/MyButton/MyButton";
import MyInputFile from "../../UI/MyInputFile/MyInputFile";
import DepAuthors from "../../files/depAuthors/DepAuthors";

import Recalculate from "./SubFunctions/Recalculate";
import MyActions from "../../UI/MyActionKeys/MyActions";
import MyStats from "../../UI/MyStats/MyStats";

const Editor = () => {
    const { statBar, item } = classes
    const { isAuth, accessToken, setKeyActive, globalSetup, setGlobalSetup } = useContext(AuthContext)


    const [authorsPublCount, setAuthorsPublCount] = useState(Number(globalSetup.authorsPublCount))
    const [autoSubmit, setAutoSubmit] = useState('true' === globalSetup.authoSuccess)
    const [err, setErr] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [fileFetching, isFileFetching, fileErr] = useFetching(async (file) => {
        const response = await PostService.fetchJSONAuthors(accessToken, file)
        console.log(response);
    })


    const [setAuthorNumber, isNumberSetting, numbErr] = useFetching(async () => {
        const response = await PostService.putMaxAuthors(accessToken, authorsPublCount)
        console.log(response);
        if (response.data.success) setGlobalSetup({ ...globalSetup, authorsPublCount: authorsPublCount })
        else setErr([...err, response.data.message])
    })

    const handleUploadClick = (filePublications) => {
        if (!filePublications) {
            setErr([...err, 'File did not selected'])
        } else {
            fileFetching(filePublications)
        }
    }

    const handleAuthorsNumber = () => {
        setAuthorNumber()
    }

    useEffect(() => {
        setKeyActive(0)
        setIsLoading(false)
    }, [])

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
                                <div className={item}>
                                    <MyLabel>Кількість авторів у однієї публікації :</MyLabel>
                                    <MyInput value={authorsPublCount} onChange={(e) => setAuthorsPublCount(Number(e.target.value))} />
                                    <MyButton onClick={handleAuthorsNumber}>{`Зберегти`}</MyButton>
                                </div>
                                <div className={item}>
                                    <MyLabel>Автопідтвердження :</MyLabel>
                                    <MyInput type={'checkbox'} defaultChecked={autoSubmit} onChange={(e) => setAutoSubmit(!e.target.value)} />
                                    <MyButton onClick={e => console.log(`Зберегти`)}>{`Зберегти`}</MyButton>
                                </div>
                            </div>
                        </div>
                        <div className={statBar}>
                            <MyInputFile
                                isFileFetching={isFileFetching}
                                saveFile={handleUploadClick}
                            />
                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                <Recalculate accessToken={accessToken} />
                            </div>
                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                <DepAuthors />
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