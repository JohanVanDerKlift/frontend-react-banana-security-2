import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: '',
  });
  const navigate = useNavigate();

  function login(email) {
    setIsAuth({
      isAuth: true,
      user: email,
    });
    console.log("De gebruiker is ingelogd");
    navigate('/profile');
  }

  function logout() {
    setIsAuth({
      isAuth: false,
      user: '',
    });
    console.log("De gebruiker is uitgelogd");
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{
      isAuth: isAuth.isAuth,
      user: isAuth.user,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;