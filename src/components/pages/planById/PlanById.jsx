import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../PageWrapper";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyLoader from "../../UI/MyLoader/MyLoader";
import { AuthContext } from "../../../context";
import MyError from "../../UI/MyError/MyError";
import classes from "./PlanById.module.css"
import MyInput from "../../UI/MyInput/MyInput";
import MyButton from "../../UI/MyButton/MyButton";
import MyTable from "../../UI/MyTable/MyTable"
import AboutTR from "./AboutTR";

const PlanById = () => {
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false)

    const [planSet, setPlanSet] = useState({
        AuthorId: undefined, year_start: '', year_end: ''
    })
    const [err, setErr] = useState([])
    const [tdk, setTDK] = useState(0)
    const [pa, setPA] = useState(0)
    const [scopus, setScopus] = useState(0)
    const [manusl, setManual] = useState(0)
    const [publs, setPubls] = useState([])
    const [selectedItem, setSelectedItem] = useState(-1)



    const { isAuth, accessToken, setKeyActive } = useContext(AuthContext)


    const [fetchingPlan, isPlanLoading, plansError] = useFetching(async (id) => {
        const response = await PostService.fetchPlanById(id);
        if (response.data.success) {
            console.log(response.data.data.plan);

            setTDK(response.data.data.plan.Theses)
            setManual(response.data.data.plan.Manuals)
            setScopus(response.data.data.plan.Scopus)
            setPA(response.data.data.plan.ProfetionalArticles)
            setPlanSet(response.data.data.plan)
        }
        else throw new Error(response.data.message)
    })

    const [setFetchPlan, isPlanFetching, sePlanError] = useFetching(async (plan, id, autorId) => {
        const response = await PostService.setPlan(plan, id, autorId)
        if (response.data[0]) {
            setTDK(response.data[1].theses)
            setManual(response.data[1].manuals)
            setScopus(response.data[1].scopus)
            setPA(response.data[1].professional_articles)
            setPlanSet(response.data[1])
        }
        else throw new Error(response.data.message)
    })

    const [setAutorPubs, isPubsFetching, pubsError] = useFetching(async (autorId) => {
        
        if (autorId !== undefined) {
            const response = await PostService.fetchPubsByAutorId(autorId);
            console.log(response.data);

            setPubls(response.data.data.publs)
        }
    })

    const saveData = () => {
        let el = {
            tdk: tdk,
            pa: pa,
            scopus: scopus,
            manusl: manusl
        }
        setFetchPlan(el, params.id, planSet.id_autor)
    }

    useEffect(() => {
        setKeyActive(0)
        fetchingPlan(params.id)
        setIsLoading(false)
    }, []);

    useEffect(() => {
        if (planSet !== []) {
            setAutorPubs(planSet.AuthorId)
        }

    }, [planSet])

    useEffect(() => {
        if (plansError !== '') setErr([...err, plansError])
    }, [plansError])
    return (
        <>
            {
                isPlanLoading || isPubsFetching || isPlanFetching
                    ? <PageWrapper><MyLoader /></PageWrapper>
                    : <>
                        {
                            err.length !== 0
                                ? <PageWrapper><MyError>{err}</MyError></PageWrapper>
                                : <PageWrapper style={{ flexDirection: 'column', justifyContent: 'start' }} title={`${planSet.autor} ${planSet.year_start} - ${planSet.year_end} `}>
                                    {
                                        isAuth
                                            ? <div className={classes.pageTable}>
                                                <div className={classes.sub}>
                                                    <span>ТДК</span>
                                                    <span><MyInput
                                                        onChange={e => setTDK(e.target.value)}
                                                        type='text'
                                                        value={tdk}
                                                    /></span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <span>СТ</span>
                                                    <span><MyInput
                                                        onChange={e => setPA(e.target.value)}
                                                        type='text'
                                                        value={pa}
                                                    /></span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <span>SW</span>
                                                    <span><MyInput
                                                        onChange={e => setScopus(e.target.value)}
                                                        type='text'
                                                        value={scopus}
                                                    /></span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <span>ПМ</span>
                                                    <span><MyInput
                                                        onChange={e => setManual(e.target.value)}
                                                        type='text'
                                                        value={manusl}
                                                    /></span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <MyButton onClick={saveData} >Зберегти</MyButton>
                                                </div>
                                            </div>
                                            : <div className={classes.pageTable}>
                                                <div className={classes.sub}>
                                                    <span>ТДК</span>
                                                    <span>{tdk}</span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <span>СТ</span>
                                                    <span>{pa}</span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <span>SW</span>
                                                    <span>{scopus}</span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <span>ПМ</span>
                                                    <span>{manusl}</span>
                                                </div>
                                            </div>
                                    }
                                    <div className={classes.contTable__wrapper}>
                                        <MyTable
                                            header={['Назва публікації', 'Тип', 'Мова', 'Дата видання']}
                                        >
                                            {
                                                publs.map(e =>
                                                    <AboutTR key={e.id} option={e} selectedItem={selectedItem} selected={e => setSelectedItem(e)} index={e.id} />

                                                )
                                            }
                                        </MyTable>
                                    </div>
                                </PageWrapper>
                        }
                    </>


            }
        </>


    )
}

export default PlanById