import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context";
import { useFetching } from "../../../hooks/useFetching";
import MyInput from "../MyInput/MyInput";
import { useNavigate } from "react-router-dom";
import MyButton from "../MyButton/MyButton";
import PostService from "../../../API/PostService";
import MyLabel from "../MyLabel/MyLabel";
import classes from "./MyStats.module.css"
import PropTypes from 'prop-types';

const MyStats = ({setBoboErr}) => {
    const { accessToken } = useContext(AuthContext)
    const { statBar, item } = classes
    const [statistic, setStatistic] = useState({ publicationsCount: 'Завантаження...', authorsCount: 'Завантаження...' })
    const navig = useNavigate();
    const [err, setErr] = useState([])

    const [statFetching, , statErr] = useFetching(async (token) => {
        const response = await PostService.fetchingStatistic(token)
        setStatistic({ publicationsCount: response.data.data.publicationsCount, authorsCount: response.data.data.authorsCount })
        !response.data.success && setErr([...err, response.data.message])
    })

    useEffect(() => {
        (setBoboErr !== null && err.length !== 0) && setBoboErr(err)
    }, [err]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect (() => {
        statErr !== '' && setErr(prev => [...prev, statErr])
    }, [statErr])
    useEffect(() => {
        statFetching(accessToken)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
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
        </>
    )
}

MyStats.defaultProps = {
    setBoboErr: null
}

MyStats.propTypes = {
    setBoboErr: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.func
    ])
}

export default MyStats