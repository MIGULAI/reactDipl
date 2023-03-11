import React from "react";
import PropTypes from 'prop-types';
import MyLabel from "../MyLabel/MyLabel";
import MyButton from "../MyButton/MyButton";
import classes from "./Key.module.css"

const Key = ({ lable, actionPlus, actionPut }) => {
    return (
        <div className={classes.key}>
            <MyLabel>{lable}</MyLabel>
            <div>
                <MyButton onClick={actionPlus} ><ion-icon name="add-outline"></ion-icon></MyButton>
                <MyButton onClick={actionPut} ><ion-icon name="pencil-outline"></ion-icon></MyButton>
            </div>
        </div>
    )
}

Key.defaultProps = {
    lable: 'This is a lable'
}

Key.propTypes = {
    lable: PropTypes.string,
    actionPlus: PropTypes.func,
    actionPut: PropTypes.func
}

export default Key