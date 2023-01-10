import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function SignIn() {
  const [ state, setState ] = useState({
    email: '',
    password: '',
  });
  const { data, login } = useContext(AuthContext);

  function onChangeHandler(e) {
    const key = e.target.name;
    setState({
      ...state,
      [key]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`
    email:    ${state.email}
    password: ${state.password}
    `)
    void signIn();
  }

  async function signIn() {
    try {
      const response = await axios.post('http://localhost:3000/login', state)
      // console.log(response.data);
      login(response.data.accessToken);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      <span>{data}</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={onChangeHandler}
          />
        </label>
        <label htmlFor="password">Wachtwoord
          <input
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={onChangeHandler}
          />
        </label>
        <button
          type="submit"
        >Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;