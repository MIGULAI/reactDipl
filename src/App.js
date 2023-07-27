import React, { useState } from "react";
import { BrowserRouter } from 'react-router-dom'
import Menu from "./components/menu/Menu";
import AppRouter from "./components/AppRouter";
import { getCookie } from "./utils/functions/Cookie";

import './styles/App.css';
import { AuthContext } from "./context";
import { useMemo } from "react";
import { useFetching } from "./hooks/useFetching";
import PostService from "./API/PostService";
import MyLoader from "./components/UI/MyLoader/MyLoader";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [accessToken, setAccessToken] = useState(null)
  const [keyActive, setKeyActive] = useState(0)
  const [globalSetup, setGlobalSetup] = useState({ authorsPublCount: '7', authoSuccess: 'false' })

  const [fetchGlobalSetup, setupLoading, setErr] = useFetching(async () => {
    const responseCokie = await PostService.init()
    const response = await PostService.fetchingGlobalSetup()
    console.log(responseCokie);
    setGlobalSetup(response.data.data)
  })

  useMemo(() => {
    fetchGlobalSetup()
    getCookie('auth') && setIsAuth(true)
    getCookie('access_token') && setAccessToken(getCookie('access_token'))
    setIsLoading(false)
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth, setIsAuth, isLoading, accessToken, setAccessToken, keyActive, globalSetup, setGlobalSetup, setKeyActive
    }}>
      <BrowserRouter>


        {
           isLoading || setupLoading
            ? <div className="globalLoaderWrapper"><MyLoader></MyLoader></div> 
            :
            <>
              <Menu />
              <AppRouter />
            </>
        }
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
