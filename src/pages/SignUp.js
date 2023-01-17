import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {
  const [ state, setState ] = useState({
    username: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  function handleChange(e) {
    const key = e.target.name;
    setState({
      ...state,
      [key]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`
    username: ${state.username}
    email:    ${state.email}
    password: ${state.password}
    `)
    void signUp();
  }

  async function signUp() {
    try {
      const response = await axios.post('http://localhost:3000/register', state)
      console.log(response.data);
      navigate('/signin');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Gebruikersnaam
          <input
            type="text"
            id="username"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">Email
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">Wachtwoord
          <input
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Registreren</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;