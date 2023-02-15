import React, { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom'
import Menu from "./components/menu/Menu";
import AppRouter from "./components/AppRouter";

import './styles/App.css';
import { AuthContext } from "./context";
import { useMemo } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [apiKey, setApiKey] = useState(null)
  const [keyActive, setKeyActive] = useState(0)

  useMemo(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    if(localStorage.getItem('apiKey')){
      setApiKey(localStorage.getItem('apiKey'))
    }
    setIsLoading(false)
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth, setIsAuth, isLoading, apiKey, setApiKey, keyActive, setKeyActive
    }}>
      <BrowserRouter>
        <Menu />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
