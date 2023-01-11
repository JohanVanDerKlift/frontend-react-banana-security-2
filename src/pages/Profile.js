import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
  const [data, setData] = useState();
  const {user: {username, email}} = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/660/private-content', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(response.data);
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    }

    void fetchData();
  }, [])

  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
      </section>
      <section>
        {data &&
          <>
            <h2>{data.title}</h2>
            <p>{data.content}</p>
          </>
        }
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;