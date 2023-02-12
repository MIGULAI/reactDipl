import React, {useContext} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router";
import { AuthContext } from "../context";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)

    let router = publicRoutes
    if(isAuth) router = privateRoutes
    return (
        <Routes>
            {
                router.map(route =>
                    <Route key={route.path} element={route.element} path={route.path} exact={route.exact} />
                )
            }
            {isAuth
            ?
            <Route path="*" element={<Navigate to="/plan" replace />} />

            :
            <Route path="*" element={<Navigate to="/login" replace />} />

            }
        </Routes>
    );
}

export default AppRouter;