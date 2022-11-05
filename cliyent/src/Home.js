import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthProvider";
import React from "react";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const Home = () => {
  // const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // -> at initial render, we need to fetch the user details by sending
  // -> request to '/@me' route
  // -> if we have the user data in api response
  // -> we'll show the user data in ui, else
  // -> we'll redirect to login page

  useEffect(() => {
    // fetch the user here
    const getuserData = async () => {
      try {
        const response = await axios.get(`${baseURL}/@me`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            navigate("/login");
          }
        }
      }
    };

    getuserData();
  }, []);

  console.log(user);

  const logout = async () => {
    await axios.post(`${baseURL}/logout`, { withCredentials: true });
    navigate("/login");
  };

  return (
    <section>
      <div>Home</div>

      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
          <p>ID: {user.id}</p>
        </div>
      )}

      <br />
      <p>You are logged in!</p>
      {/* <span>Count: {counter}</span>
      <button onClick={() => setCounter(counter + 1)}>Increae Me</button> */}
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
