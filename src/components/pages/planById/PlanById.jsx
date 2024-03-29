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
import PlanMonitirung from "./PlanMonitirung";

const PlanById = () => {
    const params = useParams()

    const [/*isLoading*/, setIsLoading] = useState(false)

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
    const [author, setAuthor] = useState()
    const [setup, setSetup] = useState();

    const { isAuth, setKeyActive } = useContext(AuthContext)


    const [fetchingPlan, isPlanLoading, plansError] = useFetching(async (id) => {
        const response = await PostService.fetchPlanById(id);
        const setup = await PostService.fetchPublSettings()
        setSetup(setup.data.data)
        if (response.data.success) {
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

        if (params.id !== undefined) {
            const response = await PostService.fetchPubsByPlanId(params.id);
            setPubls(response.data.data.publs)
        }
    })

    const [fetchAuthor, isFetching, errFetching] = useFetching(async (autorId) => {
        const response = await PostService.fetchAuthor(autorId)
        if (response.data.success) {
            setAuthor(response.data.data.author)
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
        pubsError && console.log(pubsError);
        sePlanError && console.log(sePlanError);
        errFetching && console.log(errFetching);
    }, [pubsError, sePlanError, errFetching])
    useEffect(() => {
        isAuth ? setKeyActive(1) : setKeyActive(0)
        fetchingPlan(params.id)
        setIsLoading(false)

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (planSet) {
            setAutorPubs(planSet.AuthorId)
            fetchAuthor(planSet.AuthorId)
        }
    }, [planSet]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (plansError !== '') setErr([...err, plansError])
    }, [plansError]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            {
                isPlanLoading || isPubsFetching || isPlanFetching || isFetching
                    ? <PageWrapper><MyLoader /></PageWrapper>
                    : <>
                        {
                            err.length !== 0
                                ? <PageWrapper><MyError>{err}</MyError></PageWrapper>
                                : <PageWrapper style={{ flexDirection: 'column', justifyContent: 'start' }} title={ author? `${author.SerName} ${author.Name} ${author.Patronic} - ${planSet.Year} рік` : '...'}>
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
                                                    <span>{'ТДК (План/Опублікавоно):'}</span>
                                                    <span>{tdk}/{(() => {
                                                        let a = 0
                                                        publs.forEach(e => {
                                                            if (Number(e.Type) === 1) a++
                                                        })
                                                        return a
                                                    })()}</span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <span>{'СТ (План/Опублікавоно):'}</span>
                                                    <span>{pa}/{(() => {
                                                        let a = 0
                                                        publs.forEach(e => {
                                                            if (Number(e.Type) === 2) a++
                                                        })
                                                        return a
                                                    })()}</span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <span>{'SW (План/Опублікавоно):'}</span>
                                                    <span>{scopus}/{(() => {
                                                        let a = 0
                                                        publs.forEach(e => {
                                                            if (Number(e.Type) === 3) a++
                                                        })
                                                        return a
                                                    })()}</span>
                                                </div>
                                                <div className={classes.sub}>
                                                    <span>{'ПМ (План/Опублікавоно):'}</span>
                                                    <span>{manusl}/{(() => {
                                                        let a = 0
                                                        publs.forEach(e => {
                                                            if (Number(e.Type) === 4) a++
                                                        })
                                                        return a
                                                    })()}</span>
                                                </div>
                                            </div>
                                    }
                                    <div className={classes.contTable__wrapper}>
                                        <MyTable
                                            header={['Назва публікації', 'Тип', 'Мова', 'Дата видання']}
                                        >
                                            {
                                                publs.map(e =>
                                                    <AboutTR key={e.id} option={e} setup={setup} selectedItem={selectedItem} selected={e => setSelectedItem(e)} index={e.id} />
                                                )
                                            }
                                        </MyTable>
                                    </div>
                                    <div>
                                      <PlanMonitirung planId={Number(params.id)}/>
                                    </div>
                                </PageWrapper>
                        }
                    </>


            }
        </>


    )
}

export default PlanById