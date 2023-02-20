import React from "react";
import PropTypes from 'prop-types';

import classes from "./PageWrapper.module.css"

const PageWrapper = ({ children, title, ...props }) => {
    const { pageWrapper, subWrapper, pageTitle } = classes

    return (
        <div className={pageWrapper}>
            {
                title && <div className={pageTitle}>{title}</div>
            }
            <div className={subWrapper} {...props}>
                {children}
            </div>
        </div>
    )
}

PageWrapper.defaultProps = {
    children: null,
    title: ""
}

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
}

export default PageWrapper;