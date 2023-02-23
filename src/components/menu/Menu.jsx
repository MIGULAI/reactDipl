import React, { useEffect, useState, useContext } from "react";
import classes from "./Menu.module.css"
import MenuItem from "./MenuItem";

import { IsLogingMenuItems, NotLogingMenuItems } from "../../utils/data/MenuItems";
import { AuthContext } from "../../context";
import { eraseCookie } from "../../utils/functions/Cookie"; 

const Menu = () => {
    const [menuItems, setMenuItems] = useState([])
    const [isActive, setIsActive] = useState([])

    const { isAuth, setIsAuth,  setAccessToken, keyActive, setKeyActive } = useContext(AuthContext);

    useEffect(() => {
        let menuArr = []
        if (isAuth) {
            menuArr = IsLogingMenuItems
        }
        else menuArr = NotLogingMenuItems

        setMenuItems(menuArr)
        let activeArray = []
        for (let i = 0; i < menuArr.length; i++) {
            if (i === keyActive) activeArray.push(true)
            activeArray.push(false)
        }
        setIsActive(activeArray)
    }, [keyActive, isAuth]);

    const logout = () => {
        setIsAuth(false)
        setAccessToken(null)
        eraseCookie('auth')
        eraseCookie('access_token')
    }

    return (
        <div className={classes.Menu__wrapper}>
            <ul className={classes.Menu}>
                {menuItems.map((item, i) =>
                    <MenuItem
                        isActive={isActive[i]}
                        index={i}
                        changeActive={(key) => setKeyActive(key)}
                        icon={item.icon}
                        path={item.path}
                        key={i}>{item.name}</MenuItem>
                )}
                {isAuth
                    ? <MenuItem
                        isActive={isActive[menuItems.length]}
                        index={menuItems.length}
                        onClick={() => logout()}
                        changeActive={(key) => setKeyActive(key)}
                        icon={'log-out-outline'}
                        path={'/logout'}
                        key={menuItems.length}>Вихід</MenuItem>
                    : <></>
                }
            </ul>

        </div>
    )
}

export default Menu;