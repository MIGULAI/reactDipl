import React, { useState } from "react";
import DatalistInput, { useComboboxControls } from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import MyButton from "../MyButton/MyButton";
import PropTypes from 'prop-types';

import classes from "./MyList.module.css"

const MyList = ({ header, autorsList, autors, setAutors }) => {
    const { activate, listWrapper, table, headerClass, buttonWrapper } = classes

    const [isActivate, setIsActivate] = useState(null)
    const [index, setIndex] = useState(0)
    const [isSelected, setIsSelected] = useState(null)

    const { setValue, value } = useComboboxControls({ initialValue: '' })

    const addAutor = () => {
        let a = [...autors]
        let obj = { id: isSelected.id, value: isSelected.value }
        const pos = autorsList.map(e => e.id).indexOf(isSelected.id)
        let i = index
        if (pos !== -1) {
            a[index] = obj
            i++
        }
        setAutors(a)
        if (i <= 6) setIndex(i)
        setValue("")
    }

    const deleteAutor = () => {
        let a = [...autors]
        let id = isActivate
        const pos = a.map(e => e ? e.id : null).indexOf(Number(id))
        a.splice(pos, 1)
        a.push(null)
        setAutors(a)
        setIsActivate(null)
        let i = index - 1
        setIndex(i)
    }

    return (
        <div className={listWrapper}>
            <table className={table}>
                <tbody>
                    <tr>
                        <td className={headerClass}>{header}</td>
                    </tr>
                    {
                        autors.map((e, i) =>
                            <tr key={i} onClick={item => isActivate && isActivate == item.target.getAttribute('value') ? setIsActivate(undefined) : setIsActivate(item.target.getAttribute('value'))}>
                                <td
                                    className={e && isActivate && isActivate == e.id ? activate : null}
                                    value={e && e.id}
                                >{e && e.value}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div>
                <DatalistInput
                    placeholder="Автор"
                    lable="Виберіть автора"
                    value={value}
                    setValue={setValue}
                    onSelect={(item) => setIsSelected(item)}
                    items={autorsList}
                />
                <div className={buttonWrapper}>
                    <MyButton onClick={addAutor}>Додати</MyButton>
                    {isActivate && <MyButton onClick={deleteAutor} >Видалити</MyButton>}
                </div>
            </div>
        </div>
    )
}

MyList.defaultProps = {
    header: ""
}

MyList.propTypes = {
    header: PropTypes.string.isRequired,
    autorsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            value: PropTypes.string.isRequired
        })
    ),
    autors: PropTypes.array
}

export default MyList