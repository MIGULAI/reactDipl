import React, { useContext, useEffect } from "react";
import { useFetching } from "../../../hooks/useFetching";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import MyModal from "../../UI/MyModal/MyModal";
import { AuthContext } from "../../../context";
import PostService from "../../../API/PostService";
import AddCafedraForm from "../../forms/CafedraForms/AddForms";

const ModalAddCafedra = ({ visible, setVisible, onClose }) => {
    const { accessToken, showMessage } = useContext(AuthContext)
    const [postCafedra, isPosting, errPosting] = useFetching(async (data) => {
         const response = await PostService.addCafedra(data, accessToken)
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
                : <AddCafedraForm
                    onSubmitForm={postCafedra}
                />
        }
    </MyModal>
}

export default ModalAddCafedra