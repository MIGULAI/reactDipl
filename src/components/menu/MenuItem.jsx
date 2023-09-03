import React from "react";
import classes from "./MenuItem.module.css"
import classNames from "classnames";
import { Link } from 'react-router-dom';

const MenuItem = ({ children, isActive, changeActive, icon, path, ...props }) => {
    let MenuItemClassName = classNames(classes.MenuItem)
    if (isActive) MenuItemClassName = classNames(classes.MenuItem, classes.ActiveMenuItem)
    return (
        <Link to={path} onClick={() => changeActive(props.index)} className={MenuItemClassName} {...props}>
            <span className={classes.icon}><ion-icon name={icon}></ion-icon></span>
            <p>{children}</p>
        </Link>
    );
}

export default MenuItem;