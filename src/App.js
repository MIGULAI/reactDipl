import React, { useState } from "react";
import { BrowserRouter } from 'react-router-dom'
import Menu from "./components/menu/Menu";
import AppRouter from "./components/AppRouter";
import { getCookie } from "./utils/functions/Cookie";

import './resources/styles/App.css';
import { AuthContext } from "./context";
import { useMemo } from "react";
import { useFetching } from "./hooks/useFetching";
import PostService from "./API/PostService";
import MyLoader from "./components/UI/MyLoader/MyLoader";
import MyModal from "./components/UI/MyModal/MyModal";
import SesionMessage from "./components/modals/messageModals/SesionMessageModal";
// import MessageBox from "./components/UI/MessageBox/MessageBox";
import { useEffect } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [accessToken, setAccessToken] = useState(null)
  const [keyActive, setKeyActive] = useState(0)
  const [globalSetup, setGlobalSetup] = useState({ authorsPublCount: '7', authoSuccess: 'false' })
  const [messageArray, setMessageArray] = useState()
  const [messageClasses, setMessageClasses] = useState([])
  const [messageModalVisible, setMessageModalVisible] = useState(false)
  const [fetchGlobalSetup, setupLoading, err] = useFetching(async () => {
    await PostService.init()
    const response = await PostService.fetchingGlobalSetup()
    const responseInit = await PostService.initUser()
    if (responseInit.data.success) {
      responseInit.data.authStatus ? setIsAuth(true) : setIsAuth(false)
    }
    setGlobalSetup(response.data.data)
  })

  const token = useMemo(() => {
    const token = getCookie('access_token')
    const result = token ? token : null;
    return result;
  }, []);
  useEffect(() => {
    err && console.log(err);
  }, [err])
  useEffect(() => {
    setAccessToken(token)
    fetchGlobalSetup()
    setIsLoading(false)
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const showMessage = (data) => {
    setMessageModalVisible(true)
    setMessageArray(data.message)
    if(data.success) {
      setMessageClasses(['message'])
    } else {
      setMessageClasses(['error'])
    }
  }

  return (<>

    {
      (messageModalVisible)
       && <MyModal zIndex={999} visible={messageModalVisible} setVisible={setMessageModalVisible}>
         <SesionMessage messageArray={messageArray} classesArray={messageClasses} />
       </MyModal>
      
    }
    <AuthContext.Provider value={{
      isAuth, setIsAuth, showMessage, setMessageArray, setMessageClasses, setMessageModalVisible, isLoading, accessToken, setAccessToken, keyActive, globalSetup, setGlobalSetup, setKeyActive
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
  </>
  );
}

export default App;
