import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { IsSetFetching } from "../../pages/addPubl/AddPublLogic";
import { AuthContext } from "../../../context";
import MyFormSelector from "../../UI/MyFormSelector/MyFormSelector";
import MyLabel from "../../UI/MyLabel/MyLabel";
import classes from "../../pages/addAutor/AddAutor.module.css"
import DatePicker from "react-datepicker";
import uk from 'date-fns/locale/uk';
import "react-datepicker/dist/react-datepicker.css";
import MyFormInput from "../../UI/MyFormInput/MyFormInput";
import myClasses from "../../pages/addPubl/AddPubl.module.css"
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import MyButton from "../../UI/MyButton/MyButton";
import MyList from "../../UI/MyList/MyList";
import toIsoString from "../../../utils/functions/ToIsoString";
import AddPublisherModal from "../../modals/addPublisher/AddPublisherModal";
import AddLanguageModal from "../../modals/addLanguageModal/AddLanguageModal";

const AddPublForm = ({ publication, onSubmit, submitButtonValue = 'Додати', afterPublisherCallback }) => {
    const { accessToken, globalSetup } = useContext(AuthContext)
    const { register, handleSubmit, control, setValue, setError, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            authorList: Array(Number(globalSetup.authorsPublCount)).fill(null)
        }
    });
    const [autorList, setAutorList] = useState([])
    const [langueges, setLangueges] = useState([])
    const [publishers, setPublishers] = useState([])
    const [types, setTypes] = useState([])
    const [supervisorList, setSupervisorList] = useState([])
    const [modalAddPublisherVisible, setModalAddPublisherVisible] = useState(false)
    const [modalAddLangVisible, setModalAddLangVisible] = useState(false)
    const [authors, setAuthors] = useState(Array(Number(globalSetup.authorsPublCount)).fill(null))
    const watcherStarPage = useWatch({ control, name: 'startPage' })
    const watcherEndPage = useWatch({ control, name: 'lastPage' })

    const [isSetFetching, isLoading, setErr] = useFetching(async () => {
        const [typees, languages, publishers, authores, supervisor] = await IsSetFetching(accessToken)
        setAutorList(authores)
        setLangueges(languages)
        setPublishers(publishers)
        setTypes(typees)
        setSupervisorList([{ value: 0, str: 'Відсутнє' }, ...supervisor])
    })

    const checkValidAuthorList = (authors) => {
        let countOfAuthors = 0;
        for (let i = 0; i < authors.length; i++) {
            if (authors[i]) countOfAuthors += 1;
        }
        if (countOfAuthors === 0) return false
        else return true
    }

    const beforeSubmit = (data) => {
        if (checkValidAuthorList(data.authorList)) {
            data.date = toIsoString(new Date(data.date))
            onSubmit(data)
        } else {
            setError('authorList', { type: 'required' })
        }
        console.log(data);
    }
    useEffect(() => {
        if (watcherEndPage && watcherStarPage) {
            const value = (Number(watcherEndPage) - Number(watcherStarPage) + 1) * 0.1031
            setValue('UPP', value.toFixed(2))
        }
    }, [watcherStarPage, watcherEndPage]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setErr && console.log(setErr);
    }, [setErr])
    useEffect(() => {
        if (publication && autorList.length !== 0) {
            let authorArray = [...authors]
            const authorsOfPublication = [...publication.authors]
            for (let i = 0; i < authorsOfPublication.length; i++) {
                let item = autorList.find(el => Number(el.id) === Number(authorsOfPublication[i].Author))
                authorArray[i] = item
            }
            setAuthors(authorArray)
            setValue('authorList', authorArray)
            setValue('name', publication.Name)
            setValue('startPage', Number(publication.StartPage))
            setValue('lastPage', Number(publication.EndPage))
            setValue('UPP', Number(publication.UPP))
            setValue('type', publication.Type)
            setValue('lang', publication.Language)
            setValue('publisher', publication.Publisher)
            setValue('date', new Date(publication.PublicationDate))
            setValue('issue_numb', publication.PublicationNumber)
            setValue('url', publication.DOI)
            setValue('supervisor', publication.Supervisor)

        }
    }, [publication, autorList])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        isSetFetching()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return <>
        <AddLanguageModal visible={modalAddLangVisible} setVisible={setModalAddLangVisible} onClose={() => isSetFetching()} />
        <AddPublisherModal visible={modalAddPublisherVisible} setVisible={setModalAddPublisherVisible} onClose={() => isSetFetching()} />
        <form className={myClasses.form__wrapper} onSubmit={handleSubmit(beforeSubmit)}>
            {
                (isLoading)
                    ? <MyFileLoader />
                    : <>
                        <div className={myClasses.form}>
                            <div className={classes.columItem}>
                                <div className={classes.inputFuild}
                                >
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
                                    {
                                        errors.type && <span>Виберіть тип публікації</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel >Мова :</MyLabel>
                                    <MyFormSelector
                                        options={langueges}
                                        register={{ ...register('lang', { required: true }) }}
                                    />
                                    <MyButton type={'button'} onClick={() => setModalAddLangVisible(true)}>+</MyButton>

                                    {
                                        errors.languege && <span>Виберіть мову публікації</span>
                                    }
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel >Видавець :</MyLabel>
                                    <MyFormSelector
                                        options={publishers}
                                        register={{ ...register('publisher', { required: true }) }}
                                    />
                                    <MyButton type={'button'} onClick={() => setModalAddPublisherVisible(true)}>+</MyButton>
                                    {
                                        errors.publishers && <span>Виберіть видавництво публікації</span>
                                    }
                                </div>
                                <div className={classes.columItem}>
                                    <div className={classes.inputFuild}
                                        style={{ flexWrap: "" }}
                                    >
                                        <MyLabel >Дата публікації:</MyLabel>
                                        <span style={{ minWidth: '200px' }}>
                                            <Controller
                                                control={control}
                                                name={'date'}

                                                rules={{ required: true }}
                                                render={({ field }) => <DatePicker

                                                    className={classes.dataPicker}
                                                    placeholderText={'Дата публікації'}
                                                    onChange={(date) => {
                                                        field.onChange(date)
                                                    }}
                                                    selected={field.value}
                                                    locale={uk}
                                                    dateFormat="MMMM yyyy"
                                                    showMonthYearPicker
                                                />}
                                            />
                                        </span>
                                        {
                                            errors.date && <span>Виберіть дату публікації</span>
                                        }
                                    </div>
                                </div>
                                <div className={classes.columItem}>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >Номер видання :</MyLabel>
                                        <MyFormInput
                                            placeholder={'Номер видання'}
                                            register={{ ...register('issue_numb', { required: true }) }}
                                        />
                                        {
                                            errors.issue_numb && <span>Ввведіть номер публікації</span>
                                        }
                                    </div>
                                </div>
                                <div className={classes.columItem}>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >DOI :</MyLabel>
                                        <MyFormInput
                                            placeholder={'DOI'}
                                            register={{ ...register('url', { required: false }) }}
                                        />
                                        {
                                            errors.url && <span>Ввведіть DOI публікації</span>
                                        }
                                    </div>
                                </div>
                                <div className={classes.columItem}>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >Сторінка початку :</MyLabel>
                                        <MyFormInput
                                            placeholder={'Сторінка початку'}
                                            register={{ ...register('startPage', { required: true }) }}
                                        />
                                        {
                                            errors.startPage && <span>Ввведіть сторінку початку публікації</span>
                                        }
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >Сторінка закінчення :</MyLabel>
                                        <MyFormInput
                                            placeholder={'Сторінка закінчення'}
                                            register={{ ...register('lastPage', { required: true, min: watcherStarPage }) }}
                                        />
                                        {
                                            errors.lastPage && <span>Ввведіть сторінку закінчення публікації</span>
                                        }
                                    </div>
                                    <div className={classes.inputFuild}>
                                        <MyLabel >Друковані аркуші :</MyLabel>
                                        <MyFormInput
                                            placeholder={'Кількість друкаованих аркушів'}
                                            register={{ ...register('UPP', { required: true }) }}
                                        />
                                        {
                                            errors.UPP && <span>Ввведіть сторінку початку та закінчення публікації або кількість друкованихз аркушів</span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={classes.columItem}>
                            </div>
                            <div className={classes.columItem}>
                                <div className={classes.columItem}

                                >

                                    <Controller
                                        control={control}
                                        name={"authorList"}
                                        rules={{ required: true }}
                                        render={() =>
                                            <MyList
                                                header={'Прізвище'}
                                                autors={authors}
                                                setAutors={(authors) => {
                                                    setAuthors(authors)
                                                    setValue('authorList', authors)
                                                    clearErrors('authorList')
                                                }}
                                                autorsList={autorList}
                                            />
                                        }
                                    />
                                    {
                                        errors.authorList && <span>Публікаці яповинан мати хочаб одного автора</span>
                                    }
                                </div>
                                <div className={classes.columItem}>
                                    <div className={classes.inputFuild}>
                                        <MyLabel>Наукове керівництво</MyLabel>
                                        <MyFormSelector
                                            options={supervisorList}
                                            register={{ ...register('supervisor', { required: false }) }}
                                        />

                                        {
                                            errors.supervisor && <span>Оберіть наукове курівництво</span>
                                        }
                                    </div>
                                </div>
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
    </>


}

export default AddPublForm;