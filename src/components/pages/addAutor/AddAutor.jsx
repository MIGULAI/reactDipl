import React, { useContext, useEffect, useMemo, useState } from "react";
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

const AddAutor = () => {

    const { isAuth, apiKey, setKeyActive } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState()
    const [autor, setAutor] = useState({
        name: '', sername: '', partonic: '', PIPua: '', PIPen: '', phone: '', email: '', group: 1, department: 1, organization: 1, place: 6, rank: 1, degree: 1
    })

    const [groups, setGroups] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [places, setPlaces] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [ranks, setRanks] = useState([]);


    const [subArray, setSubArray] = useState({ scientific_rank: [], scientific_degree: [], place: [], organization: [], group: [], department: [] })

    const [subArrFetch, isSubArrFetching, subArrErr] = useFetching(async () => {
        const response = await PostService.fetchAutorSettings()
        let groups = []
        for (let i = 0; i < response.data.group.length; i++) {
            let group = { value: response.data.group[i].id, str: response.data.group[i].Group }
            groups.push(group)
        }
        setGroups(groups)
        let organizations = []

        for (let i = 0; i < response.data.organization.length; i++) {
            let organization = { value: response.data.organization[i].id, str: response.data.organization[i].organization }
            organizations.push(organization)
        }
        setOrganizations(organizations)

        let departments = []

        for (let i = 0; i < response.data.department.length; i++) {
            let department = { value: response.data.department[i].id, str: response.data.department[i].department }
            departments.push(department)
        }
        setDepartments(departments)

        let places = []
        for (let i = 0; i < response.data.place.length; i++) {
            let place = { value: response.data.place[i].id, str: response.data.place[i].place }
            places.push(place)
        }
        setPlaces(places)

        let degrees = []
        for (let i = 0; i < response.data.scientific_degree.length; i++) {
            let degree = { value: response.data.scientific_degree[i].id, str: response.data.scientific_degree[i].scientific_degree }
            degrees.push(degree)
        }
        setDegrees(degrees)

        let ranks = []
        for (let i = 0; i < response.data.scientific_rank.length; i++) {
            let scientific_rank = { value: response.data.scientific_rank[i].id, str: response.data.scientific_rank[i].scientific_rank }
            ranks.push(scientific_rank)
        }
        setRanks(ranks)
    });

    useEffect(() => {
        subArrFetch()
        setKeyActive(2)
    }, [])

    useMemo(() => {
        setErr(subArrErr)
    },[subArrErr])

    return (
        <PageWrapper style={{ justifyContent: 'space-around' }} title={'Створення нового автора'}>
            {
                err
                    ? <MyError>{err}</MyError>
                    : <>

                        {
                            isSubArrFetching
                                ? <MyLoader />
                                :
                                <div>
                                    <div className={classes.table_wrapper}>
                                        <div className={classes.columItem}>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Прізвище:</MyLabel>
                                                <MyInput
                                                    type="text"
                                                    placeholder={'Прізвище'}
                                                    value={autor.sername}
                                                    onChange={e => setAutor({ ...autor, sername: e.target.value })}
                                                />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Ім'я:</MyLabel>
                                                <MyInput
                                                    type="text"
                                                    placeholder={`Ім'я`}
                                                    value={autor.name}
                                                    onChange={e => setAutor({ ...autor, name: e.target.value })}
                                                />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Побатькові:</MyLabel>
                                                <MyInput
                                                    type="text"
                                                    placeholder={'Побатькові'}
                                                    value={autor.partonic}
                                                    onChange={e => setAutor({ ...autor, partonic: e.target.value })}
                                                />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>ПІБ українською:</MyLabel>
                                                <MyInput
                                                    type="text"
                                                    placeholder={'ПІБ українською'}
                                                    value={autor.PIPua}
                                                    onChange={e => setAutor({ ...autor, PIPua: e.target.value })}
                                                />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>ПІБ англійською:</MyLabel>
                                                <MyInput
                                                    type="text"
                                                    placeholder={'ПІБ англійською'}
                                                    value={autor.PIPen}
                                                    onChange={e => setAutor({ ...autor, PIPen: e.target.value })}
                                                />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Телефон :</MyLabel>
                                                <MyInput
                                                    type="tel"
                                                    placeholder={'Телефон'}
                                                    value={autor.phone}
                                                    onChange={e => setAutor({ ...autor, phone: e.target.value })}
                                                />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Єлектронна пошта:</MyLabel>
                                                <MyInput
                                                    type="email"
                                                    placeholder={'Єлектронна пошта'}
                                                    value={autor.email}
                                                    onChange={e => setAutor({ ...autor, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className={classes.columItem}>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Группа:</MyLabel>
                                                <MySelector options={groups} selected={autor.group} onChange={e => setAutor({ ...autor, group: e.target.value })} />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Відділ (Кафедра):</MyLabel>
                                                <MySelector options={departments} selected={autor.department} onChange={e => setAutor({ ...autor, department: e.target.value })} />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Організація:</MyLabel>
                                                <MySelector options={organizations} selected={autor.organization} onChange={e => setAutor({ ...autor, organization: e.target.value })} />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Посада:</MyLabel>
                                                <MySelector options={places} selected={autor.place} onChange={e => setAutor({ ...autor, place: e.target.value })} />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Вчене звання:</MyLabel>
                                                <MySelector options={ranks} selected={autor.rank} onChange={e => setAutor({ ...autor, rank: e.target.value })} />
                                            </div>
                                            <div className={classes.inputFuild}>
                                                <MyLabel>Науковий ступінь:</MyLabel>
                                                <MySelector options={degrees} selected={autor.degree} onChange={e => setAutor({ ...autor, degree: e.target.value })} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className={classes.but__wrapper}>
                                        <MyButton>Додати</MyButton>
                                    </div>
                                </div>
                        }
                    </>
            }

        </PageWrapper>
    )
}

export default AddAutor;