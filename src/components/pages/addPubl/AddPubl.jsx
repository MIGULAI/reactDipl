import React, {useEffect, useContext} from "react";
import PageWrapper from "../PageWrapper";

import { AuthContext } from "../../../context";

const AddPubl = () => {

    const {setIsAuth, setKeyActive} = useContext(AuthContext)


    useEffect(() => {
        setKeyActive(1)
    }, []);

    return (
        <PageWrapper>
            <h1>Hello</h1>
        </PageWrapper>
    )
}

export default AddPubl;