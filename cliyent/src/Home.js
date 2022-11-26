import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthProvider";
import React from "react";
import axios from "axios";
import Blockchain from './blockchain';
const authenticate = new Blockchain();
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
        var user = await axios.get(`${baseURL}/me`, {
          withCredentials: true,

        });
        setUser(user.data);
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
//  var id = user.data.id;
//  var name = user.data.name;
//  var email = user.data.email;
//  var password = user.data.password
//  const data = authenticate.createNewData({id,name,user,password})
//  console.log(data)
  const logout = async () => {
    await axios.post(`${baseURL}/logout`, { withCredentials: true });
    navigate("/login");
  };

  return (

    
    <section>
                                  <div>Blockchain Authentication</div>

                                  <br>


                                   </br>

      {user && (
        <div>

          <p>Hey,  {user.name} ! </p>
                   <p>      </p>
          <br>
                                   </br>
          <p> Welcome to Blockchain Authentication.
          <br>


                                   </br>You are successfully logged in! </p>

        </div>
      )}

      <br />

      {/* <span>Count: {counter}</span>
      <button onClick={() => setCounter(counter + 1)}>Increae Me</button> */}
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;