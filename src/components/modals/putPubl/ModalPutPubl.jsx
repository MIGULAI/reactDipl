import React, { useContext, useEffect, useState } from "react";
import MyError from "../../UI/MyError/MyError";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import MyInput from "../../UI/MyInput/MyInput";
import MyLabel from "../../UI/MyLabel/MyLabel";
import MySelector from "../../UI/MySelector/MySelector";
import MyList from "../../UI/MyList/MyList";
import { AuthContext } from "../../../context";
import { useFetching } from "../../../hooks/useFetching";
import MyButton from "../../UI/MyButton/MyButton";
import myClasses from "../../pages/addPubl/AddPubl.module.css"
import classes from "../../pages/addAutor/AddAutor.module.css"
import { IsSetFetching } from "../../pages/addPubl/AddPublLogic";
import PostService from "../../../API/PostService";
import MySuccess from "../../UI/MySuccess/MySuccess";

const ModalPutPubl = ({ id, setPublId, errCallback }) => {
    const [err, setError] = useState([])
    const { accessToken, setKeyActive, globalSetup } = useContext(AuthContext)
    const [types, setTypes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [langueges, setLangueges] = useState([])
    const [publishers, setPublishers] = useState([])
    const [authors, setAuthors] = useState(Array(Number(globalSetup.authorsPublCount)).fill(null))

    const [autorList, setAutorList] = useState([])
    const [supervisorList, setSupervisorList] = useState([])
    const [publ, setPubl] = useState({
        Name: '', StartPage: 0, EndPage: 0, UPP: 0, Type: 1, Lang: 1, Publisher: 1, PublicationDate: '', issue_numb: '', DOI: '', authors: [], Supervisor: 0
    })
    const [mess, setMessage] = useState(null);
    const [isSetFetching, isFetching, setErr] = useFetching(async () => {
        const [typees, languages, publishers, authores, supervisor] = await IsSetFetching(accessToken)

        setAutorList(authores)
        setLangueges(languages)
        setPublishers(publishers)
        setTypes(typees)
        setSupervisorList([{ value: 0, str: 'Відсутнє' }, ...supervisor])
    })

    const [fetchPubl, isPublFetching, publErr] = useFetching(async () => {
        const response = await PostService.fetchPublication(id)
        let newPubl = response.data.data.publication
        newPubl.authors = response.data.data.authors
        setPubl(newPubl)
    })

    const [putPublication, isPutting, putErr] = useFetching(async (publicatiion) => {
        const response = await PostService.putPublication(publicatiion, accessToken)
       // console.log(response);
        setMessage(response.data.message)
    })

    const setAllAuthors = () => {
       // console.log(autorList, publ);
        let authorsList = []
        for (let i = 0; i < autorList.length; i++) {
            for (let j = 0; j < publ.authors.length; j++) {
                if (autorList[i].id === publ.authors[j].Author) authorsList.push(autorList[i]);
            }
        }

        for (let index = 0; index < authors.length; index++) {
            authorsList.push(authors[index])
        }
        authorsList.splice(Number(globalSetup.authorsPublCount), authorsList.length)
        setAuthors(authorsList)
        setIsLoading(false)
    }

    const savePubl = () => {
        let publication = { ...publ }
        publication.authors = authors
        putPublication(publication)
    }
    useEffect(() => {
        let errArray = []
        setErr !== '' && errArray.push(setErr)
        publErr !== '' && errArray.push(publErr)
        putErr !== '' && errArray.push(putErr)
        errArray.length && setError([...err, errArray])
    }, [setErr, publErr, putErr])

    useEffect(() => {
        if (autorList.length !== 0 && publ.authors.length !== 0) setAllAuthors()
    }, [autorList, publ.authors])

    useEffect(() => {
        isSetFetching()
        fetchPubl()
    }, []);
    return (
        <>
            {
                isFetching || isPublFetching || isLoading || isPutting
                    ? <MyFileLoader />
                    : <>
                        {mess === null ? <>
                            <div>
                                {err.length !== 0 && <MyError onClick={e => setError([])}>{err}</MyError>}

                                <div className={myClasses.form__wrapper} >
                                    <div style={{ width: '50%' }} className={classes.columItem}>
                                        <div className={classes.inputFuild}>
                                            <MyLabel >Назва публікації:</MyLabel>
                                            <MyInput
                                                type="text"
                                                placeholder={'Назва публікації'}
                                                value={publ.Name}
                                                onChange={e => setPubl({ ...publ, Name: e.target.value })}
                                            />
                                        </div>
                                        <div className={classes.inputFuild}>
                                            <MyLabel >Тип :</MyLabel>
                                            <MySelector
                                                options={types}
                                                selected={publ.Type}
                                                onChange={e => setPubl({ ...publ, Type: e.target.value })} />
                                        </div>
                                        <div className={classes.inputFuild}>
                                            <MyLabel >Мова :</MyLabel>
                                            <MySelector
                                                options={langueges}
                                                selected={publ.Languege}
                                                onChange={e => setPubl({ ...publ, Languege: e.target.value })} />
                                        </div>
                                        <div className={classes.inputFuild}>
                                            <MyLabel >Видавець :</MyLabel>
                                            <MySelector
                                                options={publishers}
                                                selected={publ.Publisher}
                                                onChange={e => setPubl({ ...publ, Publisher: e.target.value })} />
                                        </div>
                                        <div className={classes.columItem}>
                                            <div className={classes.inputFuild}>
                                                <MyLabel >Дата публікації:</MyLabel>
                                                <MyInput
                                                    type="month"
                                                    placeholder={'Дата публікації'}
                                                    value={publ.PublicationDate}
                                                    onChange={e => setPubl({ ...publ, PublicationDate: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className={classes.columItem}>
                                            <div className={classes.inputFuild}>
                                                <MyLabel >Номер видання :</MyLabel>
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
                                                <MyLabel >DOI :</MyLabel>
                                                <MyInput
                                                    type="text"
                                                    placeholder={'DOI'}
                                                    value={publ.DOI}
                                                    onChange={e => setPubl({ ...publ, DOI: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className={classes.columItem}>
                                            <div className={classes.inputFuild}>
                                                <MyInput
                                                    type="text"
                                                    placeholder="Початкова Сторінка"
                                                    value={publ.StartPage}
                                                    onChange={e => setPubl({ ...publ, StartPage: Number(e.target.value), UPP: (publ.lastPage - Number(e.target.value) + 1) * 0.1031 })}
                                                />
                                                <MyInput
                                                    type="text"
                                                    placeholder="Кінцева Сторінка"
                                                    value={publ.EndPage}
                                                    onChange={e => setPubl({ ...publ, EndPage: Number(e.target.value), UPP: (Number(e.target.value) - publ.startPage + 1) * 0.1031 })}
                                                />
                                                <MyInput
                                                    type="text"
                                                    placeholder="Друковані аркуші"
                                                    value={publ.UPP}
                                                    onChange={e => setPubl({ ...publ, UPP: Number(e.target.value) })}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: '50%' }} className={classes.columItem}>

                                        <div className={classes.columItem}>
                                            <MyList header={'Прізвище'} autors={authors} setAutors={setAuthors} autorsList={autorList} />
                                        </div>
                                        <div className={classes.columItem}>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Наукове керівництво</MyLabel>
                                                <MySelector
                                                    options={supervisorList}
                                                    selected={publ.Supervisor}
                                                    onChange={e => setPubl({ ...publ, Supervisor: Number(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <MyButton onClick={savePubl}>Зберегти</MyButton>

                            </ div>
                        </>
                            : <>
                                <MySuccess>{mess}</MySuccess>
                            </>
                        }
                    </>
            }
        </>
    )
}

export default ModalPutPubl