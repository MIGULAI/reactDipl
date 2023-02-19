import React, { useState, useContext, useEffect } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import MyError from "../../UI/MyError/MyError";
import MyInput from "../../UI/MyInput/MyInput";
import MyLabel from "../../UI/MyLabel/MyLabel";
import CardWrapper from "../CardWrapper";
import PageWrapper from "../PageWrapper";

import classes from "./Login.module.css"
import { AuthContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { loginLogic } from "./LoginLogic.js"

const Login = () => {

    const {buttonWrapper, inputWrapper, loginForm} = classes

    const {setIsAuth, setApiKey, setKeyActive} = useContext(AuthContext)

    const navig = useNavigate()
    const [user, setUser] = useState({ email: '', password: '' })
    const [err, setErr] = useState([])

    const login = async (e) => {
        e.preventDefault()
        let results = await loginLogic(user, setIsAuth, setApiKey)
        if(!results.length){
            setKeyActive(0)
            navig('/plan')
        }else{
            setUser({...user, password: ''})
            setErr(results)
        }
    }
    useEffect(() => {
        setKeyActive(3)
    }, [setKeyActive]);

    return (
        <PageWrapper title="Сторінка входу">
            <CardWrapper>
                <form className={loginForm} onSubmit={login}>
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
            </CardWrapper>
        </PageWrapper>
    )
}

export default Login;