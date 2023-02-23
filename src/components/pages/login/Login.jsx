import React, { useState, useContext, useEffect } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import MyError from "../../UI/MyError/MyError";
import MyInput from "../../UI/MyInput/MyInput";
import MyLabel from "../../UI/MyLabel/MyLabel";
import CardWrapper from "../CardWrapper";
import PageWrapper from "../PageWrapper";
import PostService from "../../../API/PostService";
import { useFetching } from "../../../hooks/useFetching";

import classes from "./Login.module.css"
import { AuthContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { loginLogic } from "./LoginLogic.js"
import MyLoader from "../../UI/MyLoader/MyLoader";

const Login = () => {
    const { buttonWrapper, inputWrapper, loginForm } = classes

    const { setIsAuth, setAccessToken, setKeyActive } = useContext(AuthContext)

    const navig = useNavigate()
    const [user, setUser] = useState({ email: '', password: '' })
    const [err, setErr] = useState([])

    const [isLoging, loging, loginError] = useFetching(async () => {
        let [errorArray, accessToken] = await loginLogic(user, setIsAuth, setAccessToken)
        if (!errorArray.length) {
            console.log(accessToken)
            setKeyActive(0)
            navig('/plan')
        } else {
            setUser({ ...user, password: '' })
        }
    })
    const login = async (e) => {
        e.preventDefault()
        isLoging()
    }
    useEffect(() => {
        setKeyActive(3)
    }, [setKeyActive]);

    useEffect(() => {
        let errArray = []
        loginError !== '' && errArray.push(loginError)
        errArray.length && setErr(errArray)
    }, [loginError])

    return (
        <PageWrapper title="Сторінка входу">
            <CardWrapper>
                {
                    loging
                        ? <MyLoader />
                        : <form className={loginForm} onSubmit={login}>
                            {
                                err.length !== 0 && <MyError onClick={() => setErr([])}>{err}</MyError>
                            }
                            <div className={inputWrapper}>
                                <MyLabel htmlFor={"login"} >Email</MyLabel>
                                <MyInput
                                    id="login"
                                    type="text"
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={e => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                            <div className={inputWrapper}>
                                <MyLabel htmlFor={"password"}>Password</MyLabel>
                                <MyInput
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="on"
                                    value={user.password}
                                    onChange={e => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                            <div className={buttonWrapper}>
                                <MyButton>Login</MyButton>
                            </div>
                        </form>
                }

            </CardWrapper>
        </PageWrapper>
    )
}

export default Login;