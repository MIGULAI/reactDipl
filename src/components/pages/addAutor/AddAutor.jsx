import React, { useContext, useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";

import { AuthContext } from "../../../context";
import classes from "./AddAutor.module.css"
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyInput from "../../UI/MyInput/MyInput";
import MySelector from "../../UI/MySelector/MySelector";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyLoader from "../../UI/MyLoader/MyLoader"
import MyButton from "../../UI/MyButton/MyButton";
import MyError from "../../UI/MyError/MyError";
import { getSetup } from "./AddAuthorLogic";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import myClasses from "../addPubl/AddPubl.module.css"
import AddForm from "../../forms/AuthorForms/AddForm";

const AddAutor = () => {

    const cyrillicToTranslit = new CyrillicToTranslit({ preset: 'uk' });
    const { accessToken, setKeyActive } = useContext(AuthContext)
    const [err, setErr] = useState([])
    const [autor, setAutor] = useState({
        name: '', sername: '', partonic: '', nameENG: '', sernameENG: '', partonicENG: '', PIPua: '', PIPen: '', phone: '', email: '', group: 1, department: 1, organization: 1, place: 6, rank: 1, degree: 1, startDate: '', endDate: ''
    })

    const [specialties, setSpecialties] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [places, setPlaces] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [ranks, setRanks] = useState([]);

    const [subArrFetch, isSubArrFetching, subArrErr] = useFetching(async () => {
        const [error, specialties, organizations, departments, places, degrees, ranks] = await getSetup(accessToken)
        error && setErr([...err, error])
        setSpecialties(specialties)
        setOrganizations(organizations)
        setDepartments(departments)
        setPlaces(places)
        setDegrees(degrees)
        setRanks(ranks)

    });

    const [saveNewAuthor, isAuthorSaving, saveError] = useFetching(async (newAuthor) => {
        const response = await PostService.addAutor(newAuthor, accessToken)
        console.log(response.data);
        if (!response.data.success) setErr([...err, response.data.message])
    })

    const saveAuthor = () => {
        saveNewAuthor(autor)
    }

    useEffect(() => {
        subArrFetch()
        setKeyActive(0)
    }, [])

    useEffect(() => {
        setAutor({ ...autor, nameENG: cyrillicToTranslit.transform(autor.name) });
    }, [autor.name])
    useEffect(() => {
        setAutor({ ...autor, sernameENG: cyrillicToTranslit.transform(autor.sername) });
    }, [autor.sername])
    useEffect(() => {
        setAutor({ ...autor, partonicENG: cyrillicToTranslit.transform(autor.partonic) });
    }, [autor.partonic])
    useEffect(() => {
        let errorArray = []
        saveError !== '' && errorArray.push(saveError)
        subArrErr !== '' && errorArray.push(subArrErr)
        errorArray.length && setErr([...err, errorArray])
    }, [saveError, subArrErr])

    return (
        <PageWrapper style={{ justifyContent: 'space-around' }} title={'Створення нового автора'}>
            {/* <div className={classes.content}> */}
                {err.length !== 0 && <MyError onClick={e => setErr([])}>{err}</MyError>}
                {
                    isSubArrFetching || isAuthorSaving
                        ? <MyLoader />
                        :
                        <div>
                            {/* <AddForm /> */}
                            <div className={myClasses.form__wrapper}>
                                <div className={classes.columItem}>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>{'Прізвище (UKR):'}</MyLabel>
                                        <MyInput
                                            type="text"
                                            placeholder={'Прізвище'}
                                            value={autor.sername}
                                            onChange={e => setAutor({ ...autor, sername: e.target.value })}
                                        />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>{"Ім'я (UKR):"}</MyLabel>
                                        <MyInput
                                            type="text"
                                            placeholder={`Ім'я`}
                                            value={autor.name}
                                            onChange={e => setAutor({ ...autor, name: e.target.value })}
                                        />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>{"Побатькові (UKR):"}</MyLabel>
                                        <MyInput
                                            type="text"
                                            placeholder={'Побатькові'}
                                            value={autor.partonic}
                                            onChange={e => setAutor({ ...autor, partonic: e.target.value })}
                                        />
                                    </div>
                                    
                                    <div className={classes.inputFuild}>
                                        <MyLabel>{'Прізвище (ENG):'}</MyLabel>
                                        <MyInput
                                            type="text"
                                            placeholder={'Прізвище'}
                                            value={autor.sernameENG}
                                            onChange={e => setAutor({ ...autor, sernameENG: e.target.value })}
                                        />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>{"Ім'я (ENG):"}</MyLabel>
                                        <MyInput
                                            type="text"
                                            placeholder={`Ім'я`}
                                            value={autor.nameENG}
                                            onChange={e => setAutor({ ...autor, nameENG: e.target.value })}
                                        />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>{"Побатькові (ENG):"}</MyLabel>
                                        <MyInput
                                            type="text"
                                            placeholder={'Побатькові'}
                                            value={autor.partonicENG}
                                            onChange={e => setAutor({ ...autor, partonicENG: e.target.value })}
                                        />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>Группа:</MyLabel>
                                        <MySelector options={specialties} selected={autor.group} onChange={e => setAutor({ ...autor, group: Number(e.target.value) })} />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>Відділ (Кафедра):</MyLabel>
                                        <MySelector options={departments} selected={autor.department} onChange={e => setAutor({ ...autor, department: Number(e.target.value) })} />
                                    </div>
                                </div>
                                <div className={classes.columItem}>

                                    <div className={classes.inputFuild}>
                                        <MyLabel>Організація:</MyLabel>
                                        <MySelector options={organizations} selected={autor.organization} onChange={e => setAutor({ ...autor, organization: Number(e.target.value) })} />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>Посада:</MyLabel>
                                        <MySelector options={places} selected={autor.place} onChange={e => setAutor({ ...autor, place: Number(e.target.value) })} />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>Вчене звання:</MyLabel>
                                        <MySelector options={ranks} selected={autor.rank} onChange={e => setAutor({ ...autor, rank: Number(e.target.value) })} />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>Науковий ступінь:</MyLabel>
                                        <MySelector options={degrees} selected={autor.degree} onChange={e => setAutor({ ...autor, degree: Number(e.target.value) })} />
                                    </div>
                                    {
                                        autor.department === 2 &&
                                        <>
                                            <div className={classes.inputFuild}>
                                                <MyLabel >Дата початку:</MyLabel>
                                                <MyInput
                                                    type="number"
                                                    placeholder={'Дата початку:'}
                                                    value={autor.startDate}
                                                    onChange={e => setAutor({ ...autor, startDate: e.target.value })}
                                                />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel >Дата початку:</MyLabel>
                                                <MyInput
                                                    type="number"
                                                    placeholder={'Дата кінця:'}
                                                    value={autor.endDate}
                                                    onChange={e => setAutor({ ...autor, endDate: e.target.value })}
                                                />
                                            </div>
                                        </>

                                    }

                                </div>

                            </div>
                            <div className={classes.but__wrapper}>
                                <MyButton onClick={saveAuthor}>Додати</MyButton>
                            </div>
                        </div>
                }
            {/* </div> */}




        </PageWrapper>
    )
}

export default AddAutor;