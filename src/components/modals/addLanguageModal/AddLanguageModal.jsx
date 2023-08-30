import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../../../context";
import MyModal from "../../UI/MyModal/MyModal";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import AddLangForm from "../../forms/LangForms/AddForm";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";

const AddLanguageModal = ({ visible, setVisible, onClose }) => {
    const { accessToken, showMessage } = useContext(AuthContext)
    const [postLang, isPosting, errPosting] = useFetching(async (data) => {
        console.log(data);
        const response = await PostService.addLang(data, accessToken)
        showMessage(response.data)
        if (response.data.success) {
            onClose()
            setVisible(false)
        }
    })

    useEffect(() => {
        errPosting && console.log(errPosting);
    }, [errPosting])
    return <MyModal visible={visible} setVisible={setVisible} onClose={onClose}>
        {
            isPosting
                ? <MyFileLoader />
                : <AddLangForm onSubmitForm={postLang} />
        }
    </MyModal>
}

AddLanguageModal.defaultProps = {
    visible: false,
    canClouse: true
}

AddLanguageModal.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    onClose: PropTypes.func
}
export default AddLanguageModal