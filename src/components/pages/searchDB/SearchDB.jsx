import React, { useState, useContext } from "react";
import PageWrapper from "../PageWrapper";
import MySelector from "../../UI/MySelector/MySelector";
import { SearchStates } from "../../../utils/data/SearchStates";

import { AuthContext } from "../../../context";
import classes from "./SearchDB.module.css";
import MyInput from "../../UI/MyInput/MyInput";
import { typeChange } from "./SearchDBLogic";
import { useFetching } from "../../../hooks/useFetching"
import { useEffect } from "react";
import MyLoader from "../../UI/MyLoader/MyLoader";
import PostService from "../../../API/PostService";
import MyButton from "../../UI/MyButton/MyButton";
import MyTable from "../../UI/MyTable/MyTable";
import SearchTR from "./SearchTR";
import { useNavigate } from "react-router-dom";

const SearchDB = () => {
    const { isAuth, setKeyActive, showMessage } = useContext(AuthContext)
    const { header, subWrapper, tableWrapper, btnWrapper } = classes
    const [isLoading, setIsLoading] = useState(true)
    const [state, setState] = useState(0)
    const [searchParam, setSearchParam] = useState(SearchStates[state].parametrs().data)
    const [searchType, setSearchType] = useState(SearchStates[state].type)
    const [selected, setSelected] = useState(0)
    const [trSelected, setTrSelected] = useState(null)
    const [autorsList, setAutorsList] = useState([])
    const [searchedAutorsList, setSearchedAutorsList] = useState([])
    const navigate = useNavigate()

    const [fetchAutors, isFetchingAutors, autErr] = useFetching(async () => {
        const authors = await PostService.fetchAutorsFull()
        if (authors.data.success) {
            setAutorsList(authors.data.data.authors)
            setSearchedAutorsList(authors.data.data.authors)
        } else {
            let message = { ...authors.data };
            message.message = ['Сталася помилка'];
            showMessage(message);
        }

    })

    const positionFilter = (e) => {
        setSelected(e)
        let aList = [...autorsList]
        aList = aList.filter((a) => a.Position === e)
        setSearchedAutorsList(aList)
    }

    const sernameFilter = (e) => {
        if (typeof e === 'string') {
            let aList = [...autorsList]
            e = e.toLowerCase()
            const re = new RegExp(e)
            aList = aList.filter(a => a.SerName.toLowerCase().match(re))
            setSearchedAutorsList(aList)
        }
    }

    const searchTypeChange = async (index) => {
        setTrSelected(null)
        setSearchedAutorsList(autorsList)
        setSelected(0)
        setIsLoading(true)
        setState(index)
        let [type, data] = await typeChange(index)
        setSearchParam(data)
        setSearchType(type)
        setIsLoading(false)
    }
    const about = (id) => {
        navigate(`/about/author/${id}`)
    }
    const publSearch = () => {
        navigate('/search/publications')
    }
    useEffect(() => {
        autErr && console.log(autErr);
    }, [autErr])

    useEffect(() => {
        sernameFilter(searchParam)
    }, [searchParam]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        isAuth ? setKeyActive(3) : setKeyActive(2)
        fetchAutors()
        setIsLoading(false)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageWrapper title="Сторінка пошуку по БД">
            <div>
                <MyButton onClick={() => publSearch()}>Пошук публікації</MyButton>
            </div>
            {
                isLoading || isFetchingAutors
                    ? <MyLoader />
                    : <div className={subWrapper}>
                        <div className={header}>
                            <MySelector options={SearchStates} selected={state} onChange={e => searchTypeChange(Number(e.target.value))} />
                            {searchType === 'text' && <MyInput value={searchParam} onChange={e => setSearchParam(e.target.value)} />}
                            {searchType === 'selector' && <MySelector selected={selected} options={searchParam} onChange={e => positionFilter(Number(e.target.value))} />}
                        </div>
                        <div className={tableWrapper}>
                            <MyTable
                                header={['№', 'Orcid', 'Прізвище', "Ім'я", 'По Батькові', 'Ступінь', 'Наукове звання', 'Посада']}
                            >
                                {
                                    searchedAutorsList.map((author, i) =>
                                        <SearchTR
                                            key={i}
                                            subIndex={i}
                                            option={author}
                                            index={author.id}
                                            selected={setTrSelected}
                                            selectedItem={trSelected}
                                        />
                                    )
                                }
                            </MyTable>
                        </div>
                        {
                            trSelected && <div className={btnWrapper}><MyButton onClick={() => about(trSelected)}>Детальніше</MyButton></div>
                        }
                    </div>
            }
        </PageWrapper>
    )
}

export default SearchDB;