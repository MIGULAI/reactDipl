import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router";
import { AuthContext } from "../context";

const AppRouter = () => {
    const { isAuth } = useContext(AuthContext)
    return (
        <Routes>
            {isAuth
                ?
                <Route>
                    {
                        privateRoutes.map(route =>
                            <Route key={route.path} element={route.element} path={route.path} exact={route.exact} />
                        )
                    }
                    <Route path="*" element={<Navigate to="/plan" replace />} />

                </Route>
                :
                <Route>
                    {
                        publicRoutes.map(route =>
                            <Route key={route.path} element={route.element} path={route.path} exact={route.exact} />
                        )
                    }
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Route>
            }
        </Routes>
    );
}

export default AppRouter;