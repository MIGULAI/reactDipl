import React from "react";
import PropTypes from 'prop-types';
import { useFetching } from "../../../hooks/useFetching";
import { useEffect } from "react";
import { useState } from "react";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import PostService from "../../../API/PostService";
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyInput from "../../UI/MyInput/MyInput";
import MyTable from "../../UI/MyTable/MyTable";
import ModalAuthorsTr from "./ModalAuthorsTr";
import MyButton from "../../UI/MyButton/MyButton";
import classes from "./ModalAuthorSearch.module.css"


const ModalAuthorSearch = ({ setAuthorId, errCallback }) => {

    const [authors, setAuthors] = useState([]);
    const [authorsList, setAuthorsList] = useState([]);
    const [authorName, setAuthorName] = useState('')
    const [authorSername, setAuthorSername] = useState('')
    const [authorPatronic, setAuthorPatronic] = useState('')
    const [selectedAuthor, setSelectedAuthor] = useState(null)

    const [authorsFetching, isAuthorsFetching, fetchErr] = useFetching(async () => {
        const response = await PostService.fetchAutors();
        // console.log(response.data.data.authors);
        setAuthors(response.data.data.authors)
        setAuthorsList(response.data.data.authors)
    })

    useEffect(() => {
        let aList = [...authors]
        const rName = new RegExp(authorName.toLowerCase())
        const rSername = new RegExp(authorSername.toLowerCase())
        const rPatronic = new RegExp(authorPatronic.toLowerCase())
        aList = aList.filter(a => (a.Name.toLowerCase().match(rName) && a.SerName.toLowerCase().match(rSername) && a.Patronic.toLowerCase().match(rPatronic)))
        setAuthorsList(aList)
    }, [authorName, authorSername, authorPatronic]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchErr && console.log(fetchErr);
    }, [fetchErr])

    useEffect(() => {
        authorsFetching()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {
                isAuthorsFetching
                    ? <MyFileLoader />
                    : <div>
                        <div>
                            <div className={classes.field}>
                                <MyLabel>Ім'я :</MyLabel>
                                <MyInput value={authorName} onChange={e => setAuthorName(e.target.value)} placeholder="Ім'я" />
                            </div>
                            <div className={classes.field}>
                                <MyLabel>Прізвище :</MyLabel>
                                <MyInput value={authorSername} onChange={e => setAuthorSername(e.target.value)} placeholder="Прізвище" />
                            </div>

                            <div className={classes.field}>
                                <MyLabel>По батькові :</MyLabel>
                                <MyInput value={authorPatronic} onChange={e => setAuthorPatronic(e.target.value)} placeholder="По батькові" />
                            </div>
                        </div>
                        <div>
                            <MyTable header={["Ім'я", "Прізвище", "По Батькові"]}>
                                {
                                    authorsList.map((author, i) =>
                                        <ModalAuthorsTr
                                            key={i}
                                            option={author}
                                            index={author.id}
                                            selected={setSelectedAuthor}
                                            selectedItem={selectedAuthor}
                                        />)
                                }
                            </MyTable>
                        </div>
                        {
                            selectedAuthor &&
                            <MyButton onClick={() => setAuthorId(selectedAuthor)} >Редагувати</MyButton>
                        }

                    </div>
            }
        </>
    )
}

ModalAuthorSearch.propTypes = {
    setAuthorId: PropTypes.func,
    errCallback: PropTypes.func
}

export default ModalAuthorSearch