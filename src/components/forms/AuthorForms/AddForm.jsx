import React from "react";
import { useForm } from "react-hook-form";
import myClasses from "../../pages/addPubl/AddPubl.module.css"
import classes from "../../pages/addAutor/AddAutor.module.css"
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyFormInput from "../../UI/MyInput/MyFormInput";
import MySelector from "../../UI/MySelector/MySelector";
import { useState } from "react";
import { useEffect } from "react";
import PostService from "../../../API/PostService";
import { useFetching } from "../../../hooks/useFetching";
import { getSetup } from "../../pages/addAutor/AddAuthorLogic";
import { useContext } from "react";
import { AuthContext } from "../../../context";


const AddForm = () => {
    const { register, setValue, getValues, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    const [err, setErr] = useState([])
    const { accessToken, setKeyActive } = useContext(AuthContext)
    const [type, setType] = useState(0)
    const [depart, setDepart] = useState(0)
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
    useEffect(() => {
        subArrFetch()
        setKeyActive(0)
    }, [])

    useEffect(() => {
        let errorArray = []
        saveError !== '' && errorArray.push(saveError)
        subArrErr !== '' && errorArray.push(subArrErr)
        errorArray.length && setErr([...err, errorArray])
    }, [saveError, subArrErr])
    const onSubmit = async data => { console.log(data); };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={myClasses.form__wrapper}>
            <div className={classes.columItem}>
                <div className={classes.inputFuild}>
                    <MyLabel>{'Прізвище (UKR):'}</MyLabel>
                    <MyFormInput
                        type="text"
                        placeholder={'Прізвище'}
                        register={{ ...register("lastName", { required: true }) }}
                    />
                </div>
                <div className={classes.inputFuild}>
                    <MyLabel>{"Ім'я (UKR):"}</MyLabel>
                    <MyFormInput
                        type="text"
                        placeholder={`Ім'я`}
                        register={{ ...register("name", { required: true }) }}
                    />
                </div>
                <div className={classes.inputFuild}>
                    <MyLabel>{"Побатькові (UKR):"}</MyLabel>
                    <MyFormInput
                        type="text"
                        placeholder={'Побатькові'}
                        register={{ ...register("partonic", { required: true }) }}

                    />
                </div>
                <div className={classes.inputFuild}>
                    <MyLabel>{'Прізвище (ENG):'}</MyLabel>
                    <MyFormInput
                        type="text"
                        placeholder={'Прізвище'}
                        register={{ ...register("sernameENG", { required: false }) }}
                    />
                </div>
                <div className={classes.inputFuild}>
                    <MyLabel>{"Ім'я (ENG):"}</MyLabel>
                    <MyFormInput
                        type="text"
                        placeholder={`Ім'я`}
                        register={{ ...register("nameENG", { required: false }) }}
                    />
                </div>
                <div className={classes.inputFuild}>
                    <MyLabel>{"Побатькові (ENG):"}</MyLabel>
                    <MyFormInput
                        type="text"
                        placeholder={'Побатькові'}
                        register={{ ...register("partonicENG", { required: false }) }}
                    />
                </div>
                <div className={classes.inputFuild}>
                    <MyLabel>Группа:</MyLabel>
                    <MySelector options={specialties} selected={Number(getValues('group'))} onChange={e => {
                        setValue('group', Number(e.target.value))
                        setType(Number(e.target.value))
                    }} />
                </div>
                <div className={classes.inputFuild}>
                    <MyLabel>Відділ (Кафедра):</MyLabel>
                    <MySelector options={departments} selected={depart} onChange={e => {
                        setValue('depart', Number(e.target.value))
                        setDepart(Number(e.target.value))
                    }} />
                </div>
            </div>
            <input type="submit" />
        </form>
    )
}

export default AddForm;