import React, { useContext, useEffect, useState } from "react";
import myClasses from "../../pages/addPubl/AddPubl.module.css"
import MyLabel from "../../UI/MyLabel/MyLabel";
import classes from "../../pages/addAutor/AddAutor.module.css"
import { useFetching } from "../../../hooks/useFetching";
import { AuthContext } from "../../../context";
import { getSetup } from "../../pages/addAutor/AddAuthorLogic";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import { Controller, useForm, useWatch } from "react-hook-form";
import MyButton from "../../UI/MyButton/MyButton";
import MyFormInput from "../../UI/MyFormInput/MyFormInput";
import MyFormSelector from "../../UI/MyFormSelector/MyFormSelector";
import DatePicker, { registerLocale } from "react-datepicker";
import uk from 'date-fns/locale/uk';
import "react-datepicker/dist/react-datepicker.css";
import CyrillicToTranslit from 'cyrillic-to-translit-js';

registerLocale('uk', uk)

const AuthorForm = ({ author, submitButtonValue, onSubmit }) => {
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
    const [cyrillicToTranslit] = useState(new CyrillicToTranslit({ preset: 'uk' }));
    const [specialties, setSpecialties] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [places, setPlaces] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [ranks, setRanks] = useState([]);
    const [err, setErr] = useState([])
    const { accessToken } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const departmentWatcher = useWatch({ control, name: 'department' })
    const firstNameWatcher = useWatch({ control, name: 'firstName' })
    const serNameWatcher = useWatch({ control, name: 'serName' })
    const patronicNameWatcher = useWatch({ control, name: 'patronicName' })

    // да ну нахер таке ще хоч раз писати
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
        if(firstNameWatcher) {
            const trans  =  cyrillicToTranslit.transform(firstNameWatcher)
            setValue('firstNameEng',trans)
        }
    },[firstNameWatcher]) // eslint-disable-line
    useEffect(() => {
        if(serNameWatcher) {
            const trans  =  cyrillicToTranslit.transform(serNameWatcher)
            setValue('serNameEng',trans)
        }
    },[serNameWatcher]) // eslint-disable-line
    useEffect(() => {
        if(patronicNameWatcher) {
            const trans  =  cyrillicToTranslit.transform(patronicNameWatcher)
            setValue('patronicEng',trans)
        }
        // eslint-disable-lin
    },[patronicNameWatcher]) // eslint-disable-line
    useEffect(() => {
        subArrErr && console.log(subArrErr);
    }, [subArrErr]) // eslint-disable-line
    useEffect(() => {
        subArrFetch()
    }, []) // eslint-disable-line
    return (
        <form className={myClasses.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
            {
                (isLoading)
                    ? <MyFileLoader />
                    : <>
                        <div className={myClasses.form}>
                            <div className={classes.columItem}>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{'Прізвище (UKR):'}</MyLabel>
                                    <MyFormInput
                                        type="text"
                                        placeholder={'Прізвище'}
                                        register={{ ...register('serName', { required: true }) }}
                                    />
                                    {
                                        errors.serName && <span>Введіть Прізвище Автора</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{"Ім'я (UKR):"}</MyLabel>
                                    <MyFormInput
                                        type="text"
                                        placeholder={`Ім'я`}
                                        register={{ ...register('firstName', { required: true }) }}
                                    />
                                    {
                                        errors.firstName && <span>Введіть Ім'я Автора</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{"Побатькові (UKR):"}</MyLabel>
                                    <MyFormInput
                                        type="text"
                                        placeholder={'Побатькові'}
                                        register={{ ...register('patronicName', { required: false }) }}
                                    />
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{'Прізвище (ENG):'}</MyLabel>
                                    <MyFormInput
                                        type="text"
                                        placeholder={'Прізвище'}
                                        register={{ ...register('serNameEng', { required: true }) }}
                                    />
                                    {
                                        errors.serNameEng && <span>Введіть Прізвище Автора</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{"Ім'я (ENG):"}</MyLabel>
                                    <MyFormInput
                                        type="text"
                                        placeholder={`Ім'я`}
                                        register={{ ...register('firstNameEng', { required: true }) }}
                                    />
                                    {
                                        errors.firstNameEng && <span>Введіть Ім'я Автора</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{"Побатькові (ENG):"}</MyLabel>
                                    <MyFormInput
                                        type="text"
                                        placeholder={'Побатькові'}
                                        register={{ ...register('patronicEng', { required: false }) }}
                                    />
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>Группа:</MyLabel>
                                    <MyFormSelector
                                        options={specialties}
                                        register={{ ...register('specialty', { required: true }) }}
                                    />
                                    {
                                        errors.specialties && <span>Виберіть групу</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>Відділ (Кафедра):</MyLabel>
                                    <MyFormSelector
                                        options={departments}
                                        register={{ ...register('department', { required: true }) }}
                                    />
                                    {
                                        errors.department && <span>Виберіть кафедру</span>
                                    }
                                </div>
                            </div>
                            <div className={classes.columItem}>
                                <div className={classes.inputFuild}>
                                    <MyLabel>Організація:</MyLabel>
                                    <MyFormSelector
                                        options={organizations}
                                        register={{ ...register('organization', { required: true }) }}
                                    />
                                    {
                                        errors.organization && <span>Виберіть організацію</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>Посада:</MyLabel>
                                    <MyFormSelector
                                        options={places}
                                        register={{ ...register('position', { required: true }) }}
                                    />
                                    {
                                        errors.position && <span>Виберіть посаду</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>Вчене звання:</MyLabel>
                                    <MyFormSelector
                                        options={ranks}
                                        register={{ ...register('rank', { required: true }) }}
                                    />
                                    {
                                        errors.rank && <span>Виберіть вчене звання</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>Науковий ступінь:</MyLabel>
                                    <MyFormSelector
                                        options={degrees}
                                        register={{ ...register('degree', { required: true }) }}
                                    />
                                    {
                                        errors.degree && <span>Виберіть вчене звання</span>
                                    }
                                </div>
                                {
                                    Number(departmentWatcher) === 2 &&
                                    <>
                                        <div className={classes.inputFuild}>
                                            <MyLabel >Дата початку:</MyLabel>
                                            <Controller
                                                control={control}
                                                name="startDate"
                                                render={({ field }) => <DatePicker
                                                    placeholderText="Оберіть дату початку роботи викладача"
                                                    onChange={(date) => field.onChange(date)}
                                                    selected={field.value}
                                                    locale={uk}
                                                />}
                                            />
                                        </div>
                                    </>
                                }
                            </div>


                        </div>
                        <div className={myClasses.submit}>
                            <MyButton type="submit" children={submitButtonValue} />
                        </div>
                    </>
            }
        </form>
    )
}


export default AuthorForm;