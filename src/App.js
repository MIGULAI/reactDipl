import React, { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom'
import Menu from "./components/menu/Menu";
import AppRouter from "./components/AppRouter";

import './styles/App.css';
import { AuthContext } from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false)
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth, setIsAuth, isLoading
    }}>
      <BrowserRouter>
        <Menu />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
