import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: null,
    status: 'pending',
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Context wordt gerefresht!");
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      void fetchUser(decoded, token);
    } else {
      setIsAuth({
        isAuth: false,
        user: null,
        status: 'done',
      })
    }
  }, [])

  function login(token) {
    localStorage.setItem('token', token);
    const decoded = jwt_decode(token);
    void fetchUser(decoded, token);
  }

  async function fetchUser(decoded, token) {
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
        status: 'done',
      })
      console.log("De gebruiker is ingelogd");
      navigate('/profile');
    } catch (e) {
      console.error(e);
      setIsAuth({
        isAuth: false,
        user: null,
        status: 'done',
      })
    }
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
      {isAuth.status === 'pending'
        ? <p>Loading...</p>
        : children
      }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;