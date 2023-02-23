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

const SearchDB = () => {
    const { isAuth, setKeyActive } = useContext(AuthContext)
    const { header, subWrapper, tableWrapper, btnWrapper } = classes
    const [isLoading, setIsLoading] = useState(true)

    const [state, setState] = useState(0)
    const [searchParam, setSearchParam] = useState(SearchStates[state].parametrs().data)
    const [searchType, setSearchType] = useState(SearchStates[state].type)
    const [selected, setSelected] = useState(0)
    const [trSelected, setTrSelected] = useState(null)
    const [autorsList, setAutorsList] = useState([])
    const [searchedAutorsList, setSearchedAutorsList] = useState([])

    const [fetchAutors, isFetchingAutors, autErr] = useFetching(async () => {
        const authors = await PostService.fetchAutors()
        setAutorsList(authors.data.data.authors)
        setSearchedAutorsList(authors.data.data.authors)
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

    useEffect(() => {
        sernameFilter(searchParam)
    }, [searchParam])

    useEffect(() => {
        if (isAuth) setKeyActive(3)
        else setKeyActive(1)
        fetchAutors()
        setIsLoading(false)
    }, [])

    return (
        <PageWrapper title="Сторінка пошуку по БД">
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
                                header={['Прізвище', "Ім'я", 'По Батькові', 'Організація', 'Наукове звання', 'Наукова ступінь', 'Email']}
                            >
                                {
                                    searchedAutorsList.map((author, i) =>
                                        <SearchTR
                                            key={i}
                                            option={author}
                                            index={i}
                                            selected={setTrSelected}
                                            selectedItem={trSelected}
                                        />
                                    )
                                }
                            </MyTable>
                        </div>
                        {
                            trSelected && <div className={btnWrapper}><MyButton>Детальніше</MyButton></div>
                        }
                        

                    </div>


            }

        </PageWrapper>
    )
}

export default SearchDB;