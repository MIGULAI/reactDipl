import React, { useContext, useEffect } from "react";
import AddRankForm from "../../forms/RankForms/AddForm";
import { useFetching } from "../../../hooks/useFetching";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";
import MyModal from "../../UI/MyModal/MyModal";
import { AuthContext } from "../../../context";
import PostService from "../../../API/PostService";

const AddRankModal = ({ visible, setVisible, onClose }) => {
    const { accessToken, showMessage } = useContext(AuthContext)

    const [postPosision, isPosting, errPosting] = useFetching(async (data) => {
        console.log(data);
        const response = await PostService.addRank(data, accessToken)
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
                : <AddRankForm
                    onSubmitForm={postPosision}
                />
        }
    </MyModal>
}

export default AddRankModal