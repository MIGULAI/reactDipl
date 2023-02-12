import React, { useState, useContext, useEffect } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import MyError from "../../UI/MyError/MyError";
import MyInput from "../../UI/MyInput/MyInput";
import MyLable from "../../UI/MyLable/MyLable";
import CardWrapper from "../CardWrapper";
import PageWrapper from "../PageWrapper";
import { EmailValidation, PasswordValidation } from "../../../utils/functions/validation.js"
import PostService from "../../../API/PostService";

import classes from "./Login.module.css"
import { AuthContext } from "../../../context";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {setIsAuth, setApiKey, setKeyActive} = useContext(AuthContext)

    const navig = useNavigate()
    const [user, setUser] = useState({ email: '', password: '' })
    const [err, setErr] = useState(null)

    const login = async (e) => {
        e.preventDefault()
        let emailValid = EmailValidation(user.email)
        let passwordValid = PasswordValidation(user.password)
        if (!emailValid[0]) setErr(emailValid[1])
        if (!passwordValid[0]) setErr(passwordValid[1])
        if (emailValid[0] && passwordValid[0]) {
            let res = await PostService.LoginService(user);
            if (res.data[0]) {
                setIsAuth(true)
                setApiKey(res.data[2])
                localStorage.setItem('auth', 'true')
                localStorage.setItem('apiKey', res.data[2])
                setKeyActive(0)
                navig('/plan')
                
            } else {
                setErr(res.data[1])
            }
        }

    }
    useEffect(() => {
        setKeyActive(3)
    }, [setKeyActive]);

    return (
        <PageWrapper title="Сторінка входу">

            <CardWrapper>
                <form className={classes.login__form} onSubmit={login}>
                    {
                        err === null
                            ? <></>
                            : <MyError>{err}</MyError>
                    }
                    <div className={classes.input__wrapper}>
                        <MyLable>Email</MyLable>
                        <MyInput
                            type="text"
                            placeholder="Email"
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className={classes.input__wrapper}>
                        <MyLable>Password</MyLable>
                        <MyInput
                            type="password"
                            placeholder="Password"
                            autoComplete="on"
                            value={user.password}
                            onChange={e => setUser({ ...user, password: e.target.value })}
                        />
                    </div>

                    <div className={classes.but__wrapper}>
                        <MyButton>Login</MyButton>
                    </div>
                </form>

            </CardWrapper>
        </PageWrapper>
    )
}

export default Login;