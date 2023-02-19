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

const AddPubl = () => {

    const [isLoading, setIsLoading] = useState(true)
    const { setIsAuth, setKeyActive } = useContext(AuthContext)
    const [err, setError] = useState()

    //publicSetup
    const [types, setTypes] = useState([])
    const [langueges, setLangueges] = useState([])
    const [publishers, setPublishers] = useState([])
    const [autors, setAutors] = useState(Array(7).fill(null))

    const [autorList, setAutorList] = useState([])
    const [publ, setPubl] = useState({
        name: '', type: 1, lang: 1, publisher: 1, date: '', issue_numb: '', url: '', autors: []
    })


    const [isSetFetching, isFetching, setErr] = useFetching(async () => {
        const response = await PostService.fetchPublSettings()
        let typees = []
        for (let i = 0; i < response.data.types.length; i++) {
            let type = { value: response.data.types[i].id, str: response.data.types[i].ShortName }
            typees.push(type);
        }
        let languages = []
        for (let i = 0; i < response.data.language.length; i++) {
            let language = { value: response.data.language[i].id, str: response.data.language[i].Language }
            languages.push(language);
        }
        let publishers = []
        for (let i = 0; i < response.data.publisher.length; i++) {
            let publisher = { value: response.data.publisher[i].id, str: response.data.publisher[i].publisher_name }
            publishers.push(publisher);
        }
        let autores = []
        for (let i = 0; i < response.data.autors.length; i++) {
            let autor = { id: response.data.autors[i].id, value: response.data.autors[i].Ukr_PIP }
            autores.push(autor);
        }
        setAutorList(autores)
        setLangueges(languages)
        setPublishers(publishers)
        setTypes(typees)
    })

    const [isAddPublFetching, isSaveFetching, pubErr] = useFetching(async (publ) => {
        const response = await PostService.addPub(publ)
        console.log(response.data);
    })

    const savePubl = () => {
        let obj = publ
        let a = []
        for (let i = 0; i < autors.length; i++) {
            if (autors[i] !== -1) a.push(autors[i])
        }
        if (a.length === 0) {
            setError("Публікація повинна мати хочаб одного автора!!!")
        } else {
            obj.autors = a
            console.log(obj);
            isAddPublFetching(publ);
            setAutors(Array(7).fill(null))
        }
    }

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
                        <div onClick={e => setError(undefined)}>
                            {
                                err !== undefined
                                ?<MyError>{err}</MyError>
                                :<></>
                            }
                        </div>
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
                                    <MyList header={'Прізвище'} autors={autors} setAutors={setAutors} autorsList={autorList} />
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