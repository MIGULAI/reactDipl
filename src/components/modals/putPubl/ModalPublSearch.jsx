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

const ModalPublSearch = ({ setPublId }) => {
    const [allPubls, setAllPubls] = useState([])
    const [publList, setPublList] = useState([])
    const [publName, setPublName] = useState()
    const [selectedPubl, setSelectedPubl] = useState()

    const [publFetching, isPublFetching, fetchErr] = useFetching(async () => {
        const response = await PostService.fetchPubls()
        setPublList(response.data.data.publications)
        setAllPubls(response.data.data.publications)
    })
    useEffect(() => {
        if (publName && publName !== '') {
            const result = allPubls.filter(publ => publ.Name.includes(publName))
            setPublList(result)
        }else if(publName === ''){
            setPublList(allPubls)
        }
    }, [publName]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchErr && console.log(fetchErr);
    }, [fetchErr])
    useEffect(() => {
        publFetching()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>{
            isPublFetching
                ? <MyFileLoader />
                : <div>
                    <div>
                        <div className={classes.field}>
                            <MyLabel>Ім'я :</MyLabel>
                            <MyInput value={publName} onChange={e => setPublName(e.target.value)} placeholder="Назва публікації" />
                        </div>
                    </div>
                    <div className={classes.tableWrapper}>
                        <MyTable header={["Назва публікації", "Дата публікації"]}>
                            {
                                publList.map(publ =>
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