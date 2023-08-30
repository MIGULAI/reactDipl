import React from "react";
import PropTypes from 'prop-types';
import classes from "../../pages/addAutor/AddAutor.module.css"
import myClasses from "../../pages/addPubl/AddPubl.module.css"
import MyButton from "../../UI/MyButton/MyButton";
import { useForm } from "react-hook-form";
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyFormInput from "../../UI/MyFormInput/MyFormInput";

const AddLangForm = ({ onSubmitForm, submitButtonValue = 'Додати' }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const beforeSubmit = (data) => {
        console.log(data);
        onSubmitForm(data)
    }
    return <form className={myClasses.form__wrapper} onSubmit={handleSubmit(beforeSubmit)} >
        <div className={myClasses.formOneRow}>
            <div className={classes.columItem}>
                <div className={classes.inputFuild}>
                    <MyLabel>Мова :</MyLabel>
                    <MyFormInput
                        type="text"
                        placeholder={'Мова'}
                        register={{ ...register('langName', { required: true }) }}
                    />
                    {
                        errors.langName && <span>Введіть мову</span>
                    }
                </div>
                <div className={classes.inputFuild}>
                    <MyLabel>Коротка назва :</MyLabel>
                    <MyFormInput
                        type="text"
                        placeholder={'Мова'}
                        register={{ ...register('langShortName', { required: true }) }}
                    />
                    {
                        errors.langShortName && <span>Введіть Коротку назву</span>
                    }
                </div>
            </div>
            <div className={myClasses.submit}>
                <MyButton type="submit"  >
                    {submitButtonValue}
                </MyButton>
            </div>
        </div>
    </form >
}

AddLangForm.propTypes = {
    onSubmitForm: PropTypes.func,
    submitButtonValue: PropTypes.string
}

export default AddLangForm