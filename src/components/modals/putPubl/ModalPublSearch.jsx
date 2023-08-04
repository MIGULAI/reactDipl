import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
import PostService from "../../../API/PostService";
import { useFetching } from "../../../hooks/useFetching";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import classes from "./ModalPublSearch.module.css"
import MyLabel from "../../UI/MyLabel/MyLabel";
import MyInput from "../../UI/MyInput/MyInput";
import MyTable from "../../UI/MyTable/MyTable";
import ModalPublTr from "./ModalPublTr";
import MyButton from "../../UI/MyButton/MyButton";

const ModalPublSearch = ({ setPublId, errCallback }) => {
    const [/*publs*/, setPubls] = useState([])
    const [publList, setPublList] = useState([])
    const [publName, setPublName] = useState()
    const [selectedPubl, setSelectedPubl] = useState()

    const [publFetching, isPublFetching, fetchErr] = useFetching(async () => {
        const response = await PostService.fetchPubls()
        setPubls(response.data.data.publications)
        setPublList(response.data.data.publications)
        //console.log(response.data.data.publications);
    })
    useEffect(() => {
        fetchErr && console.log(fetchErr);
    },[fetchErr])
    useEffect(() => {
        publFetching()
    }, []);
    return (
        <>{
            isPublFetching
                ? <MyFileLoader />
                : <div>
                    <div>
                        <div className={classes.field}>
                            <MyLabel>Ім'я :</MyLabel>
                            <MyInput value={publName} onChange={e => setPublName(e.target.value)} placeholder="Ім'я" />
                        </div>
                    </div>
                    <div>
                        <MyTable header={["Назва публікації", "Дата публікації"]}>
                            {
                                publList.map((publ, i) =>
                                    <ModalPublTr
                                        key={publ.id}
                                        option={publ}
                                        index={publ.id}
                                        selected={setSelectedPubl}
                                        selectedItem={selectedPubl}
                                    />)
                            }
                        </MyTable>
                    </div>
                    {
                        selectedPubl &&
                        <MyButton onClick={() => setPublId(selectedPubl)} >Редагувати</MyButton>
                    }

                </div>

        }

        </>

    );
}

ModalPublSearch.propTypes = {
    setPublId: PropTypes.func,
    errCallback: PropTypes.func
}

export default ModalPublSearch