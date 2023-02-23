import React, { useContext, useEffect, useState } from "react";
import MyInput from "../../UI/MyInput/MyInput";
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyLoader from "../../UI/MyLoader/MyLoader";
import PageWrapper from "../PageWrapper";
import classes from "./Admin.module.css"
import { AuthContext } from "../../../context";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyError from "../../UI/MyError/MyError";
import MyButton from "../../UI/MyButton/MyButton";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const { statBar, item} = classes
    const { accessToken, setKeyActive, globalSetup, setGlobalSetup  } = useContext(AuthContext)
    const navig = useNavigate()
    const [authorsPublCount, setAuthorsPublCount] = useState(Number(globalSetup.authorsPublCount))
    const [autoSubmit, setAutoSubmit] = useState('true' === globalSetup.authoSuccess)

    const [err, setErr] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [statistic, setStatistic] = useState({ publicationsCount: 0, authorsCount: 0 })

    const [statFetching, isStatFetching, statErr] = useFetching(async (token) => {
        const response = await PostService.fetchingStatistic(token)
        setStatistic({ publicationsCount: response.data.data.publicationsCount, authorsCount: response.data.data.authorsCount })
        !response.data.success && setErr([...err, response.data.message])
    })

    useEffect(() => {
        console.log(globalSetup);
        statFetching(accessToken)
        setKeyActive(5)
        setIsLoading(false)
    }, [])

    return (
        <PageWrapper title={"Сторінка адміністратора"}>
            {err.length !== 0 && <MyError onClick={() => setErr([])}>{err}</MyError>}
            {
                isLoading || isStatFetching
                    ? <MyLoader></MyLoader>
                    : <div>
                        <div className={statBar}>
                            <div className={item}>
                                <MyLabel>{'Кількість авторів :'}</MyLabel>
                                <MyInput value={statistic.authorsCount} type={'text'} readOnly={true} />
                                <MyButton onClick={e => navig('/add/autor')}><ion-icon name="add-outline"></ion-icon></MyButton>
                            </div>
                            <div className={item}>
                                <MyLabel>{'Кількість публікацій :'}</MyLabel>
                                <MyInput value={statistic.publicationsCount} type={'text'} readOnly={true} />
                                <MyButton onClick={e => navig('/add/public')}><ion-icon name="add-outline"></ion-icon></MyButton>

                            </div>
                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                <MyButton onClick={e => console.log('Переглянути плани')}>{'Плани'}</MyButton>
                            </div>
                            <div className={item}>
                                <MyLabel>Створення плану на поточний рік :</MyLabel>
                                <MyButton onClick={e => console.log(`створити план на ${'year'}`)}>{`створити план на ${'year'}`}</MyButton>
                            </div>


                        </div>
                        <div className={statBar}>
                            <div className={item}>
                                <div className={item}>
                                    <MyLabel>Кількість авторів у однієї публікації :</MyLabel>
                                    <MyInput value={authorsPublCount} onChange={(e) => setAuthorsPublCount(Number(e.target.value))} />
                                    <MyButton onClick={e => console.log(`Зберегти`)}>{`Зберегти`}</MyButton>
                                </div>
                                <div className={item}>
                                    <MyLabel>Автопідтвердження :</MyLabel>
                                    <MyInput type={'checkbox'} defaultChecked={autoSubmit} onChange={(e) => setAutoSubmit(!e.target.value)} />
                                    <MyButton onClick={e => console.log(`Зберегти`)}>{`Зберегти`}</MyButton>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </PageWrapper>
    )
}

export default Admin;