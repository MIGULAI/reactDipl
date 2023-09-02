import React, { useContext, useEffect } from "react";
import { useFetching } from "../../../hooks/useFetching";
import AddPosisionForm from "../../forms/PositionForms/AddForm";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import MyModal from "../../UI/MyModal/MyModal";
import { AuthContext } from "../../../context";
import PostService from "../../../API/PostService";

const ModalAddPosition = ({ visible, setVisible, onClose }) => {
    const { accessToken, showMessage } = useContext(AuthContext)

    const [postPosision, isPosting, errPosting] = useFetching(async (data) => {
        const response = await PostService.addPosision(data, accessToken)
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
                : <AddPosisionForm
                    onSubmitForm={postPosision}
                />
        }
    </MyModal>
}

export default ModalAddPosition