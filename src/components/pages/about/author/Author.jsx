import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../PageWrapper";
import { useFetching } from "../../../../hooks/useFetching";
import PostService from "../../../../API/PostService";
import { AuthContext } from "../../../../context";
import myClasses from "../../../pages/addPubl/AddPubl.module.css"
import classes from "../../../pages/addAutor/AddAutor.module.css"
import MyLabel from "../../../UI/MyLabel/MyLabel";
import MyFileLoader from "../../../UI/MyFileLoader/MyFileLoader";
import MyButton from "../../../UI/MyButton/MyButton";
import ModalChangeAuthor from "../../../modals/putAuthor/ModalChangeAuthor";
import MyModal from "../../../UI/MyModal/MyModal";

const AboutAuthor = () => {
    const { id } = useParams()
    const [author, setAuthors] = useState()
    const { isAuth, showMessage } = useContext(AuthContext)
    const [changeModalVisible, setModalVisible] = useState(false)
    const [fetchAuthor, isFetching, errFetching] = useFetching(async () => {
        const response = await PostService.fetchAuthor(id)
        if (response.data.success) {

            setAuthors(response.data.data.author)
        } else {
            showMessage(response.data)
        }
    }, true)
    useEffect(() => {
        errFetching && console.log(errFetching);
    }, [errFetching])
    useEffect(() => {
        fetchAuthor()
    }, []) // eslint-disable-line
    return <PageWrapper title="Сторінка про автора">
        {
            changeModalVisible && <MyModal visible={changeModalVisible} setVisible={setModalVisible}>
                <ModalChangeAuthor  id={id}/>
            </MyModal>
        }

        <form className={myClasses.form__wrapper}>
            {
                (isFetching)
                    ? <MyFileLoader />
                    : <>
                        <div className={myClasses.form}>
                            <div className={classes.columItem}>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{'Прізвище (UKR):'}</MyLabel>
                                    <p>{author && author.SerName}</p>
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{"Ім'я (UKR):"}</MyLabel>
                                    <p>{author && author.Name}</p>
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{"Побатькові (UKR):"}</MyLabel>
                                    <p>{author && author.Patronic}</p>
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{'Прізвище (ENG):'}</MyLabel>
                                    <p>{author && author.SerNameEng ? author.SerNameEng : '-'}</p>
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{"Ім'я (ENG):"}</MyLabel>
                                    <p>{author && author.NameEng ? author.NameEng : '-'}</p>

                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{"Побатькові (ENG):"}</MyLabel>
                                    <p>{author && author.PatronicEng ? author.PatronicEng : '-'}</p>
                                </div>
                                <div className={classes.inputFuild}>
                                    <MyLabel>{"Orcid автора:"}</MyLabel>
                                    <p>{author && author.Orcid ? author.Orcid.split('').map((el, i) => {
                                        if (i !== 0 && i % 4 === 0) {
                                            return `-${el}`
                                        }
                                        return el
                                    }) : '-'}</p>

                                </div>
                                {
                                    isAuth ? <div >
                                        <MyButton type="button" onClick={() => setModalVisible(true)}>Редагувати</MyButton>
                                    </div>
                                        : <></>
                                }

                            </div>
                        </div>
                    </>
            }
        </form>
    </PageWrapper>
}

export default AboutAuthor