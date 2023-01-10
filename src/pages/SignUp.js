import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form>
        <label htmlFor="username">Gebruikersnaam
          <input
            type="text"
            id="username"
            name="username"
            // value={state.username}
            // onChange={handleChange}
          />
        </label>
        <label htmlFor="email">Email
          <input
            type="email"
            id="email"
            name="email"
            // value={state.email}
            // onChange={handleChange}
          />
        </label>
        <label htmlFor="password">Wachtwoord
          <input
            type="password"
            id="password"
            name="password"
            // value={state.password}
            // onChange={handleChange}
          />
        </label>
        <button type="submit">Registreren</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;