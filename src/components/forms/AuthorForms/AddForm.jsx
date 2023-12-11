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
import ModalAddPosition from "../../modals/addPosition/ModalAddPosition";
import AddRankModal from "../../modals/addRank/AddRankModal";
import AddDegreeModal from "../../modals/addDegree/AddDegreeModal";
import ModalAddCafedra from "../../modals/addCafedra/ModalAddCafedra";

registerLocale('uk', uk)

const AuthorForm = ({ author, submitButtonValue, onSubmit }) => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
  const [cyrillicToTranslit] = useState(new CyrillicToTranslit({ preset: 'uk' }));
  const [specialties, setSpecialties] = useState([]);
  const [/*organizations*/, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [places, setPlaces] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [err, setErr] = useState([])
  const { accessToken } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [positionAddModalVisible, setPositionAddModalVisible] = useState(false)
  const [rankAddModalVisible, setRankAddModalVisible] = useState(false)
  const [degreeAddModalVisible, setDegreeAddModalVisible] = useState(false)
  const [cafedraAddModalVisible, setCafedraAddModalVisible] = useState(false)
  const departmentWatcher = useWatch({ control, name: 'department' })
  const firstNameWatcher = useWatch({ control, name: 'firstName' })
  const serNameWatcher = useWatch({ control, name: 'serName' })
  const patronicNameWatcher = useWatch({ control, name: 'patronicName' })
  const positionWatcher = useWatch({ control, name: 'position' })
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

  const beforeSubmit = (data) => {
    data.orcid = data.orcid.replaceAll('-', '')
    // console.log(data.orcid);
    onSubmit(data)
  }

  useEffect(() => {
    if (firstNameWatcher) {
      const trans = cyrillicToTranslit.transform(firstNameWatcher)
      if (!(author)) {
        setValue('firstNameEng', trans)
      }
    }
  }, [firstNameWatcher]) // eslint-disable-line
  useEffect(() => {
    if (serNameWatcher) {
      const trans = cyrillicToTranslit.transform(serNameWatcher)
      if (!(author)) {
        setValue('serNameEng', trans)
      }
    }
  }, [serNameWatcher]) // eslint-disable-line
  useEffect(() => {
    if (patronicNameWatcher) {
      const trans = cyrillicToTranslit.transform(patronicNameWatcher)
      if (!(author)) {
        setValue('patronicEng', trans)

      }
    }
    // eslint-disable-lin
  }, [patronicNameWatcher]) // eslint-disable-line
  useEffect(() => {
    subArrErr && console.log(subArrErr);
  }, [subArrErr]) // eslint-disable-line
  useEffect(() => {
    subArrFetch()
  }, []) // eslint-disable-line
  useEffect(() => {
    if (author && !isLoading) {
      setValue('serName', author.SerName)
      setValue('firstName', author.Name)
      setValue('patronicName', author.Patronic)
      setValue('serNameEng', author.SerNameEng ? author.SerNameEng : '')
      setValue('firstNameEng', author.NameEng ? author.NameEng : '')
      setValue('nameEng', author.NameEng ? author.NameEng : '')
      setValue('patronicEng', author.PatronicEng ? author.PatronicEng : '')
      setValue('startDate', author.StarDate);
      setValue('patronicEng', author.PatronicEng ? author.PatronicEng : '')
      author.Orcid && setValue('orcid', author.Orcid)
      if (ranks) {
        const rank = ranks.filter(el => el.value === author.Rank)[0]
        if (rank) setValue('rank', rank.value)
      }
      if (degrees) {
        const degree = degrees.filter(el => el.value === author.Degree)[0]
        if (degree) setValue('degree', degree.value)
      }
      if (places) {
        const place = places.filter(el => el.value === author.Position)[0]
        if (place) setValue('position', place.value)
      }
      if (departments) {
        const department = departments.filter(el => el.value === author.Department)[0]
        if (department) setValue('department', department.value)
      }
      if (specialties) {
        const specialty = specialties.filter(el => el.value === author.Specialty)[0]
        if (specialty) setValue('specialty', specialty.value)
      }
    }
  }, [author, isLoading]) // eslint-disable-line react-hooks/exhaustive-deps

  return <>
    <AddRankModal visible={rankAddModalVisible} setVisible={setRankAddModalVisible} onClose={() => subArrFetch()} />
    <ModalAddPosition visible={positionAddModalVisible} setVisible={setPositionAddModalVisible} onClose={() => subArrFetch()} />
    <AddDegreeModal visible={degreeAddModalVisible} setVisible={setDegreeAddModalVisible} onClose={() => subArrFetch()} />
    <ModalAddCafedra visible={cafedraAddModalVisible} setVisible={setCafedraAddModalVisible} onClose={() => subArrFetch()} />
    <form className={myClasses.form__wrapper} onSubmit={handleSubmit(beforeSubmit)}>
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
                  <MyLabel>{"Orcid автора:"}</MyLabel>
                  <MyFormInput
                    type="text"
                    placeholder={'____-____-____-____'}
                    register={{ ...register('orcid', { required: true, minLength: 16, maxLength: 20 }) }}
                    mask={'9999-9999-9999-999*'}
                  />
                  {errors.orcid && <span>Orcid введено не коректно</span>}
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
                  <div className={classes.inputFueldRow}>
                    <MyLabel>Відділ (Кафедра):</MyLabel>
                    <MyFormSelector
                      options={departments}
                      register={{ ...register('department', { required: true }) }}
                    />
                    <MyButton type={'button'} onClick={() => setCafedraAddModalVisible(true)}>+</MyButton>

                  </div>

                  {
                    errors.department && <span>Виберіть кафедру</span>
                  }
                </div>
              </div>
              <div className={classes.columItem}>
                <div className={classes.inputFuild}>
                  <div className={classes.inputFueldRow}>

                    <MyLabel>Посада:</MyLabel>
                    <MyFormSelector
                      options={places}
                      register={{ ...register('position', { required: true }) }}
                    />
                    <MyButton type={'button'} onClick={() => setPositionAddModalVisible(true)}>+</MyButton>
                  </div>
                  {
                    errors.position && <span>Виберіть посаду</span>
                  }
                </div>
                <div className={classes.inputFuild}>
                  <div className={classes.inputFueldRow}>

                    <MyLabel>Вчене звання:</MyLabel>
                    <MyFormSelector
                      options={ranks}
                      register={{ ...register('rank', { required: true }) }}
                    />
                    <MyButton type={'button'} onClick={() => setRankAddModalVisible(true)}>+</MyButton>
                  </div>
                  {
                    errors.rank && <span>Виберіть вчене звання</span>
                  }
                </div>
                <div className={classes.inputFuild}>
                  <div className={classes.inputFueldRow}>

                    <MyLabel>Науковий ступінь:</MyLabel>
                    <MyFormSelector
                      options={degrees}
                      register={{ ...register('degree', { required: true }) }}
                    />
                    <MyButton type={'button'} onClick={() => setDegreeAddModalVisible(true)}>+</MyButton>
                  </div>
                  {
                    errors.degree && <span>Виберіть вчене звання</span>
                  }
                </div>
                {
                  (Number(departmentWatcher) === 2 && (Number(positionWatcher) !== 2 && Number(positionWatcher) !== 1 && Number(positionWatcher) !== 0)) &&
                  <>
                    <div className={classes.inputFuild}>
                      <div className={classes.inputFueldRow}>

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
  </>
}


export default AuthorForm;