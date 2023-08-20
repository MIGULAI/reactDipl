import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { IsSetFetching } from "../../pages/addPubl/AddPublLogic";
import { AuthContext } from "../../../context";
import MyFormSelector from "../../UI/MyFormSelector/MyFormSelector";
import MyLabel from "../../UI/MyLabel/MyLabel";
import classes from "../../pages/addAutor/AddAutor.module.css"
import DatePicker, { registerLocale } from "react-datepicker";
import uk from 'date-fns/locale/uk';
import "react-datepicker/dist/react-datepicker.css";
import MyFormInput from "../../UI/MyFormInput/MyFormInput";
import myClasses from "../../pages/addPubl/AddPubl.module.css"
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import MyButton from "../../UI/MyButton/MyButton";

const AddPublForm = ({onSubmit, submitButtonValue = 'Додати'}) => {
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
    const { accessToken, setKeyActive, globalSetup } = useContext(AuthContext)
    const [autorList, setAutorList] = useState([])
    const [langueges, setLangueges] = useState([])
    const [publishers, setPublishers] = useState([])
    const [types, setTypes] = useState([])
    const [supervisorList, setSupervisorList] = useState([])

    const [isSetFetching, isLoading, setErr] = useFetching(async () => {
        const [typees, languages, publishers, authores, supervisor] = await IsSetFetching(accessToken)
        setAutorList(authores)
        setLangueges(languages)
        setPublishers(publishers)
        setTypes(typees)
        setSupervisorList([{ value: 0, str: 'Відсутнє' }, ...supervisor])
    })

    const beforeSubmit = (date) => {
        console.log(date);
    }
    useEffect(() => {
        isSetFetching()
    }, [])
    return <form className={myClasses.form__wrapper} onSubmit={handleSubmit(beforeSubmit)}>
        {
            (isLoading)
                ? <MyFileLoader />
                : <>
                    <div className={myClasses.form}>
                        <div className={classes.columItem}>
                            <div className={classes.inputFuild}>
                                <MyLabel >Назва публікації :</MyLabel>
                                <MyFormInput
                                    type="text"
                                    placeholder={'Назва публікації'}
                                    register={{ ...register('name', { required: true }) }}
                                />
                                {
                                    errors.name && <span>Введіть назву публікації</span>
                                }
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel >Тип :</MyLabel>
                                <MyFormSelector
                                    options={types}
                                    register={{ ...register('type', { required: true }) }}
                                />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel >Мова :</MyLabel>
                                <MyFormSelector
                                    options={langueges}
                                    register={{ ...register('languege', { required: true }) }}

                                />
                            </div>
                            <div className={classes.inputFuild}>
                                <MyLabel >Видавець :</MyLabel>
                                <MyFormSelector
                                    options={publishers}
                                    register={{ ...register('publisher', { required: true }) }}
                                />
                            </div>
                            <div className={classes.columItem}>
                                <div className={classes.inputFuild}>
                                    <MyLabel >Дата публікації:</MyLabel>
                                    <Controller
                                        control={control}
                                        name={'date'}
                                        render={({ field }) => <DatePicker
                                            placeholder={'Дата публікації'}
                                            onChange={(date) => field.onChange(date)}
                                            selected={field.value}
                                            locale={uk}
                                            dateFormat="MMMM yyyy"
                                            showMonthYearPicker
                                        />}
                                    />
                                </div>
                            </div>
                            <div className={classes.columItem}>
                                <div className={classes.inputFuild}>
                                    <MyLabel >Номер видання :</MyLabel>
                                    <MyFormInput
                                        placeholder={'Номер видання'}
                                        register={{ ...register('issue_numb', { required: true }) }}
                                    // value={publ.issue_numb}
                                    // onChange={e => setPubl({ ...publ, issue_numb: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={classes.columItem}>
                                <div className={classes.inputFuild}>
                                    <MyLabel >DOI :</MyLabel>
                                    <MyFormInput
                                        placeholder={'DOI'}
                                        register={{ ...register('url', { required: false }) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.columItem}>
                        </div>
                    </div>
                    <div className={myClasses.submit}>
                        <MyButton type="submit"  >
                            {submitButtonValue}
                        </MyButton>
                    </div>
                </>
        }
    </form>


}

export default AddPublForm;