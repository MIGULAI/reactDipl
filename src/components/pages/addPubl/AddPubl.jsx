import React, { useEffect, useContext } from "react";
import PageWrapper from "../PageWrapper";

import { AuthContext } from "../../../context";
import { useState } from "react";
import MyLoader from "../../UI/MyLoader/MyLoader";
import { useFetching } from "../../../hooks/useFetching";

import classes from '../addAutor/AddAutor.module.css'
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyInput from "../../UI/MyInput/MyInput";
import PostService from "../../../API/PostService";
import MySelector from "../../UI/MySelector/MySelector";
import MyList from "../../UI/MyList/MyList";
import MyButton from "../../UI/MyButton/MyButton";

import myClasses from "./AddPubl.module.css"
import MyError from "../../UI/MyError/MyError";
import { IsSetFetching } from "./AddPublLogic";

const AddPubl = () => {

    const [isLoading, setIsLoading] = useState(true)
    const {apiKey, setIsAuth, setKeyActive } = useContext(AuthContext)
    const [err, setError] = useState([])

    const [types, setTypes] = useState([])
    const [langueges, setLangueges] = useState([])
    const [publishers, setPublishers] = useState([])
    const [authors, setAuthors] = useState(Array(7).fill(null))

    const [autorList, setAutorList] = useState([])
    const [publ, setPubl] = useState({
        name: '', type: 1, lang: 1, publisher: 1, date: '', issue_numb: '', url: '', authors: []
    })

    const [isSetFetching, isFetching, setErr] = useFetching(async () => {
        const [typees, languages, publishers, authores] = await IsSetFetching()
        setAutorList(authores)
        setLangueges(languages)
        setPublishers(publishers)
        setTypes(typees)
    })

    const [isAddPublFetching, isSaveFetching, pubErr] = useFetching(async (publ) => {
        const response = await PostService.addPub(publ, apiKey)

        if(!response.data.success) setError([...err, response.data.message])
        if(response.data.success){
            setPubl({ name: '', type: 1, lang: 1, publisher: 1, date: '', issue_numb: '', url: '', authors: []})
            setAuthors(Array(7).fill(null))
        }
    })

    const savePubl = () => {
        let obj = publ
        let a = []
        for (let i = 0; i < authors.length; i++) {
            if (authors[i]) a.push(authors[i])
        }
        if (a.length === 0) {
            setError([ ...err, "Публікація повинна мати хочаб одного автора!!!"])
        } else {
            obj.authors = a
            isAddPublFetching(publ);
        }
    }

    useEffect(() => {
        if(setErr) setError([...err, setErr])
    },[setErr])

    useEffect(() => {
        setKeyActive(1)
        isSetFetching()
        setIsLoading(false)
    }, []);

    return (
        <PageWrapper title={'Додання публікації'}>
            {
                isLoading || isFetching || isSaveFetching
                    ? <MyLoader />
                    : <div>
                        {err.length != 0 && <MyError onClick={e => setError([])}>{err}</MyError>}

                        <div className={myClasses.form__wrapper} >
                            <div style={{ width: '50%' }} className={classes.columItem}>
                                <div className={classes.inputFuild}>
                                    <MyLabel >Назва публікації:</MyLabel>
                                    <MyInput
                                        type="text"
                                        placeholder={'Назва публікації'}
                                        value={publ.name}
                                        onChange={e => setPubl({ ...publ, name: e.target.value })}
                                    />
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel >Тип :</MyLabel>
                                    <MySelector
                                        options={types}
                                        selected={publ.type}
                                        onChange={e => setPubl({ ...publ, type: e.target.value })} />
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel >Мова :</MyLabel>
                                    <MySelector
                                        options={langueges}
                                        selected={publ.languege}
                                        onChange={e => setPubl({ ...publ, languege: e.target.value })} />
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel >Видавець :</MyLabel>
                                    <MySelector
                                        options={publishers}
                                        selected={publ.publisher}
                                        onChange={e => setPubl({ ...publ, publisher: e.target.value })} />
                                </div>
                                <div className={classes.columItem}>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >Дата публікації:</MyLabel>
                                        <MyInput
                                            type="month"
                                            placeholder={'Дата публікації'}
                                            value={publ.date}
                                            onChange={e => setPubl({ ...publ, date: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className={classes.columItem}>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >Номер видання:</MyLabel>
                                        <MyInput
                                            type="text"
                                            placeholder={'Номер видання'}
                                            value={publ.issue_numb}
                                            onChange={e => setPubl({ ...publ, issue_numb: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className={classes.columItem}>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >Зовнішній файл:</MyLabel>
                                        <MyInput
                                            type="text"
                                            placeholder={'Url'}
                                            value={publ.url}
                                            onChange={e => setPubl({ ...publ, url: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '50%' }} className={classes.columItem}>

                                <div className={classes.columItem}>
                                    <MyList header={'Прізвище'} autors={authors} setAutors={setAuthors} autorsList={autorList} />
                                </div>
                            </div>
                        </div>
                        <MyButton onClick={savePubl}>Зберегти</MyButton>

                    </ div>
            }

        </PageWrapper>
    )
}

export default AddPubl;