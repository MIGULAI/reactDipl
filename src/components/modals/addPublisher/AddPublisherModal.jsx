import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import AddPublisherForm from "../../forms/PubliserForms/AddForm";
import MyModal from "../../UI/MyModal/MyModal";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import { AuthContext } from "../../../context";
import MyFileLoader from "../../UI/MyFileLoader/MyFileLoader";

const AddPublisherModal = ({ visible, setVisible, onClose }) => {
    const { accessToken, setMessageArray, setMessageClasses, setMessageModalVisible } = useContext(AuthContext)
    const [postPublisher, isPosting, errPosting] = useFetching(async (data) => {
        const response = await PostService.addPublisher(data, accessToken)
        if (response.data.success) {
            setMessageClasses(['message'])
            onClose()
            setVisible(false)
        } else {
            setMessageClasses(['error'])
        }
        setMessageArray(response.data.message)
        setMessageModalVisible(true)
    })

    useEffect(() => {
        errPosting && console.log(errPosting);
    }, [errPosting])

    return <MyModal visible={visible} setVisible={setVisible} onClose={onClose}>
        {
            isPosting
                ? <MyFileLoader />
                : <AddPublisherForm
                    onSubmitForm={postPublisher}
                />
        }
    </MyModal>
}

AddPublisherModal.defaultProps = {
    visible: false,
    canClouse: true
}

AddPublisherModal.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    onClose: PropTypes.func
}

export default AddPublisherModal