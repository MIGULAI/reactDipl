import React from "react";
import MyFileLoader from "../../../UI/MyFileLoader/MyFileLoader";
import PropTypes from 'prop-types';
import MySuccess from "../../../UI/MySuccess/MySuccess";
import MyError from "../../../UI/MyError/MyError";


const SuccessModal = ({ loader, children, err }) => {
    return (
        <div>
            {
                loader
                    ? <MyFileLoader />
                    : <>{
                        err.length !== 0
                            ? <MyError>{err}</MyError>
                            : <MySuccess>{children}</MySuccess>
                    }
                    </>
            }
        </div>
    )
}

SuccessModal.defaultProps = {
    loader: true,
    children: '',
    err: []
}

SuccessModal.propTypes = {
    loader: PropTypes.bool,
    children: PropTypes.string,
    err: PropTypes.array
}

export default SuccessModal