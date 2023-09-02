import React from "react";
import { useForm } from "react-hook-form";
import classes from "../../pages/addAutor/AddAutor.module.css"
import myClasses from "../../pages/addPubl/AddPubl.module.css"
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyFormInput from "../../UI/MyFormInput/MyFormInput";
import MyButton from "../../UI/MyButton/MyButton";
import PropTypes from 'prop-types';

const AddDegreeForm = ({ degree, onSubmitForm, submitButtonValue = 'Додати'}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const beforeSubmit = (data) => {
        onSubmitForm(data)
    }
    return <form className={myClasses.form__wrapper} onSubmit={handleSubmit(beforeSubmit)} >
    <div className={myClasses.formOneRow}>
        <div className={classes.columItem}>
            <div className={classes.inputFuild}>
                <MyLabel >Назва наукового ступіня :</MyLabel>
                <MyFormInput
                    type="text"
                    placeholder={'Назва наукового ступіня'}
                    register={{ ...register('degreeName', { required: true }) }}
                />
                {
                    errors.degreeName && <span>Введіть назву наукового ступіня</span>
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

AddDegreeForm.propTypes = {
    onSubmitForm: PropTypes.func,
    submitButtonValue: PropTypes.string
}

export default AddDegreeForm