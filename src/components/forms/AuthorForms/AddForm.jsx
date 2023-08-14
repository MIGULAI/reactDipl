import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MySelector from "../../UI/MySelector/MySelector";
import myClasses from "../../pages/addPubl/AddPubl.module.css"
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyInput from "../../UI/MyInput/MyInput";
import classes from "../../pages/addAutor/AddAutor.module.css"
import { useFetching } from "../../../hooks/useFetching";
import { AuthContext } from "../../../context";
import { getSetup } from "../../pages/addAutor/AddAuthorLogic";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";

const AuthorForm = ({ author, setAuthor, }) => {
    const [specialties, setSpecialties] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [places, setPlaces] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [ranks, setRanks] = useState([]);
    const [err, setErr] = useState([])
    const { accessToken } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [subArrFetch, , subArrErr] = useFetching(async () => {
        const [error, specialties, organizations, departments, places, degrees, ranks] = await getSetup(accessToken)
        error && setErr([...err, error])
        setSpecialties(specialties)
        setOrganizations(organizations)
        setDepartments(departments)
        setPlaces(places)
        setDegrees(degrees)
        setRanks(ranks)
        setIsLoading(false)
    });
    useEffect(() => {
        subArrErr && console.log(subArrErr);
    }, [subArrErr])
    useEffect(() => {
        subArrFetch()
    }, [])
    return (
        <div className={myClasses.form__wrapper}>
            {
                (isLoading && author !== {})
                    ? <MyFileLoader />
                    : <>
                        <div className={classes.columItem}>
                            <div className={classes.inputFuild}>
                                <MyLabel>{'Прізвище (UKR):'}</MyLabel>
                                <MyInput
                                    type="text"
                                    placeholder={'Прізвище'}
                                    value={author.SerName}
                                    onChange={e => setAuthor({ ...author, SerName: e.target.value })}
                                />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>{"Ім'я (UKR):"}</MyLabel>
                                <MyInput
                                    type="text"
                                    placeholder={`Ім'я`}
                                    value={author.Name}
                                    onChange={e => setAuthor({ ...author, Name: e.target.value })}
                                />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>{"Побатькові (UKR):"}</MyLabel>
                                <MyInput
                                    type="text"
                                    placeholder={'Побатькові'}
                                    value={author.Patronic}
                                    onChange={e => setAuthor({ ...author, Patronic: e.target.value })}
                                />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>{'Прізвище (ENG):'}</MyLabel>
                                <MyInput
                                    type="text"
                                    placeholder={'Прізвище'}
                                    value={author.SerNameEng}
                                    onChange={e => setAuthor({ ...author, SerNameEng: e.target.value })}
                                />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>{"Ім'я (ENG):"}</MyLabel>
                                <MyInput
                                    type="text"
                                    placeholder={`Ім'я`}
                                    value={author.NameEng}
                                    onChange={e => setAuthor({ ...author, NameEng: e.target.value })}
                                />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>{"Побатькові (ENG):"}</MyLabel>
                                <MyInput
                                    type="text"
                                    placeholder={'Побатькові'}
                                    value={author.PatronicEng}
                                    onChange={e => setAuthor({ ...author, PatronicEng: e.target.value })}
                                />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>Группа:</MyLabel>
                                <MySelector options={specialties} selected={author.Specialty} onChange={e => setAuthor({ ...author, Specialty: Number(e.target.value) })} />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>Відділ (Кафедра):</MyLabel>
                                <MySelector options={departments} selected={author.Department} onChange={e => setAuthor({ ...author, Department: Number(e.target.value) })} />
                            </div>
                        </div>
                        <div className={classes.columItem}>
                            <div className={classes.inputFuild}>
                                <MyLabel>Організація:</MyLabel>
                                <MySelector options={organizations} selected={author.Organization} onChange={e => setAuthor({ ...author, Organization: Number(e.target.value) })} />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>Посада:</MyLabel>
                                <MySelector options={places} selected={author.Position} onChange={e => setAuthor({ ...author, Position: Number(e.target.value) })} />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>Вчене звання:</MyLabel>
                                <MySelector options={ranks} selected={author.Rank} onChange={e => setAuthor({ ...author, Rank: Number(e.target.value) })} />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel>Науковий ступінь:</MyLabel>
                                <MySelector options={degrees} selected={author.Degree} onChange={e => setAuthor({ ...author, Degree: Number(e.target.value) })} />
                            </div>
                            {
                                author.department === 2 &&
                                <>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >Дата початку:</MyLabel>
                                        <MyInput
                                            type="number"
                                            placeholder={'Дата початку:'}
                                            value={author.startDate}
                                            onChange={e => setAuthor({ ...author, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >Дата початку:</MyLabel>
                                        <MyInput
                                            type="number"
                                            placeholder={'Дата кінця:'}
                                            value={author.endDate}
                                            onChange={e => setAuthor({ ...author, endDate: e.target.value })}
                                        />
                                    </div>
                                </>

                            }
                        </div>
                    </>
            }
        </div>
    )
}

AuthorForm.propTypes = {
    author: PropTypes.object,
    setAuthor: PropTypes.func
}

export default AuthorForm;