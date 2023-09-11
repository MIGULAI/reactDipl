import React, { useContext, useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import classes from './SearchPublication.module.css'
import MyInput from "../../UI/MyInput/MyInput";
import { AuthContext } from "../../../context";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import MyTable from "../../UI/MyTable/MyTable";
import SearchPublRT from "./SearchPublRT";

export const SearchPublication = () => {
    const { setKeyActive, isAuth } = useContext(AuthContext)
    const [searchName, setSearchName] = useState()
    const [rawPublications, setRawPublications] = useState()
    const [searchedPublications, setSearchedPublications] = useState()
    const [trSelected, setTrSelected] = useState()
    const [fetchPublications, isFetching, err] = useFetching(async () => {
        const response = await PostService.fetchPubls();
        if (response.data.success) {
            const publications = response.data.data.publications
            setRawPublications(publications)
            setSearchedPublications(publications)
        }
    });
    useEffect(() => {
        err && console.log(err);
    }, [err])
    useEffect(() => {
        if (isAuth) {
            setKeyActive(3)
        } else {
            setKeyActive(2)
        }
        fetchPublications();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (searchName) {
            const serched = rawPublications.filter(publ => publ.Name.includes(searchName))
            setSearchedPublications(serched)
        } else {
            setSearchedPublications(rawPublications)
        }
        
    }, [searchName]) // eslint-disable-line react-hooks/exhaustive-deps
    return <PageWrapper title="Сторінка пошуку публікації по БД">
        <div className={classes.wrapper}>
            <div>
                <MyInput type="text" placeholder="Назва" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            </div>
            {
                isFetching
                    ? <MyFileLoader />
                    : <div className={classes.tableWrapper}>
                        <MyTable
                            header={['№', 'Назва']}
                        >
                            {
                                searchedPublications && searchedPublications.map((publ, i) =>
                                    <SearchPublRT
                                        key={i}
                                        subIndex={i}
                                        option={publ}
                                        index={publ.id}
                                        selected={setTrSelected}
                                        selectedItem={trSelected}
                                    />
                                )
                            }
                        </MyTable>
                    </div>
            }

        </div>
    </PageWrapper>;
};
