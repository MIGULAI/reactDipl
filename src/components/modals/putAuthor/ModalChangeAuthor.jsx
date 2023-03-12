import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import { AuthContext } from "../../../context";
import { getSetup } from "../../pages/addAutor/AddAuthorLogic";
import classes from "../../pages/addAutor/AddAutor.module.css"
import myClasses from "../../pages/addPubl/AddPubl.module.css"
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyInput from "../../UI/MyInput/MyInput";
import MyButton from "../../UI/MyButton/MyButton";
import MySelector from "../../UI/MySelector/MySelector";

const ModalChangeAuthor = ({id, setAuthorId, errCallback}) => {
    const [author, setAuthor] = useState({
        Orcid: '', Scopus: '',Name: '', SerName: '', Patronic: '', NameENG: '', SerNameENG: '', PatronicENG: '', PIPua: '', PIPen: '', phone: '', email: '', Specialty: 1, Department: 1, Organization: 1, Position: 1, Rank: 1, Degree: 1, StartDate: '', EndDate: ''
    })
    const [err, setErr] = useState([])
    const {accessToken} = useContext(AuthContext)

    const [specialties, setSpecialties] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [places, setPlaces] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [ranks, setRanks] = useState([]);

    const [fetchAuthor, isAuthorFetching, errFetching] = useFetching( async() => {
        const response = await PostService.fetchAuthor(id)
        setAuthor(response.data.data.author)
        console.log(response.data.data.author);
    })
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

    useEffect(() => {
        fetchAuthor()
        subArrFetch()
    },[])
    return (
        <>
            {
                (isAuthorFetching || isSubArrFetching)
                ? <MyFileLoader />
                : <div>
                <div className={myClasses.form__wrapper}>
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
                                value={author.SerNameENG}
                                onChange={e => setAuthor({ ...author, SerNameENG: e.target.value })}
                            />
                        </div>
                        <div className={classes.inputFuild}>
                            <MyLabel>{"Ім'я (ENG):"}</MyLabel>
                            <MyInput
                                type="text"
                                placeholder={`Ім'я`}
                                value={author.NameENG}
                                onChange={e => setAuthor({ ...author, NameENG: e.target.value })}
                            />
                        </div>
                        <div className={classes.inputFuild}>
                            <MyLabel>{"Побатькові (ENG):"}</MyLabel>
                            <MyInput
                                type="text"
                                placeholder={'Побатькові'}
                                value={author.PatronicENG}
                                onChange={e => setAuthor({ ...author, PatronicENG: e.target.value })}
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

                </div>
                <div className={classes.but__wrapper}>
                    <MyButton onClick={() => console.log("hello world")}>Додати</MyButton>
                </div>
            </div>
            }
        </>
    )
}


ModalChangeAuthor.propTypes = {
    id: PropTypes.number,
    setAuthorId: PropTypes.func,
    errCallback: PropTypes.func
}


export default ModalChangeAuthor