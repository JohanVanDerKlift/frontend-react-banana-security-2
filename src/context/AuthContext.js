import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: null,
  });
  const navigate = useNavigate();

  function login(token) {
    localStorage.setItem('token', token);
    const decoded = jwt_decode(token);

    async function fetchUser() {
      try {
        const response = await axios.get(`http://localhost:3000/600/users/${decoded.sub}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(response.data);
        setIsAuth({
          isAuth: true,
          user: {
            username: response.data.username,
            email: response.data.email,
            id: response.data.id,
          },
        })
        console.log("De gebruiker is ingelogd");
        navigate('/profile');
      } catch (e) {
        console.error(e);
      }
    }

    void fetchUser();
  }

  function logout() {
    setIsAuth({
      isAuth: false,
      user: null,
    });
    localStorage.clear();
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