import React, {useState} from "react";
import classes from "./MyInputFile.module.css"
import MyLabel from "../MyLabel/MyLabel";
import MyFileLoader from "../MyFileLoader/MyFileLoader";
import MyButton from "../MyButton/MyButton";
import PropTypes from 'prop-types';


const MyInputFile = ({isFileFetching, saveFile}) => {
    const {loaderItem, fileLoader, fileInput} = classes

    const [filePublications, setFilePublications] = useState()


    const handleFileChange = (e) => {
        if (e.target.files) {
            setFilePublications(e.target.files[0]);
        }
    };

    return (
        <div className={loaderItem}>
            {
                isFileFetching && <div className={fileLoader}><MyFileLoader /></div>
            }
            <MyLabel htmlFor={"file-upload"} className={fileInput}>Вибрати файл</MyLabel>
            <input type="file" id={"file-upload"} onChange={handleFileChange} />

            <div>{filePublications && `${filePublications.name} - ${filePublications.type}`}</div>
            <MyButton onClick={() => saveFile(filePublications)}>Завантажити</MyButton>
        </div>
    )
}

MyInputFile.defaultProps = {
    isFileFetching: false
}

MyInputFile.propTypes = {
    isFileFetching: PropTypes.bool,
    saveFile: PropTypes.func
}

export default MyInputFile