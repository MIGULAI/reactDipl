import React, { useContext, useEffect } from "react";
import { useFetching } from "../../../hooks/useFetching";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import MyModal from "../../UI/MyModal/MyModal";
import { AuthContext } from "../../../context";
import PostService from "../../../API/PostService";
import AddDegreeForm from "../../forms/DegreeForms/AddForms";

const AddDegreeModal = ({ visible, setVisible, onClose }) => {
    const { accessToken, showMessage } = useContext(AuthContext)
    const [postDegree, isPosting, errPosting] = useFetching(async (data) => {
        const response = await PostService.addDegree(data, accessToken)
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
                : <AddDegreeForm
                    onSubmitForm={postDegree}
                />
        }
    </MyModal>
}

export default AddDegreeModal