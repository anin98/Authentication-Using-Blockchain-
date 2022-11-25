import "./App.css";
import React from 'react'
import {useNavigate} from "react-router-dom";

function Default() {
  let navigate=useNavigate();  
  return (
    <div><h1>Welcome to Blockchain Authentication</h1>
    <button class="button" onClick={()=> {navigate("/login")}}>Sign In</button><br></br>
    <button class="button" onClick={()=> {navigate("/register")}}>Register</button>
        
    </div>
    
  )
}

export default Default