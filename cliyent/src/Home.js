import {useNavigate, Link} from "react-router-dom"
import { useContext } from "react"
import AuthContext from "./context/AuthProvider"
import React from 'react'

const Home = () => {
    const {setAuth} = useContext(AuthContext);
    const navigate =useNavigate();

    const logout = async () => {

        setAuth({});
        navigate('/login');
    }
  return (
    <section>
    <div>Home</div>
    <br />
    <p>You are logged in!</p>
    <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
    </div>
    </section>
  )
}


export default Home
