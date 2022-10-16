import React, {useState,useEffect} from 'react';
import Axios from 'axios'
import {API_BASE_URL} from './config';
import './App.css';
import Blockchain from './Blockchain';
function App() {
const [nameReg,setNameReg] = useState('')
const [emailReg,setEmailReg] = useState('')
const [passwordReg,setPasswordReg] = useState('')
const register =() => {
Axios.post('http://localhost3000/register',{name:
nameReg,
email:emailReg,
password:passwordReg,
}).then((response)=> {
console.log(response);
});
};
return (
<div className ="Registration">
<h1>Registration</h1>
<label>Name</label>
<input type ="text" onChange={(e) => {setNameReg(e.target.value);
 }}/>
<label>Email</label>
<input type ="text" onChange={(e) => {setEmailReg(e.target.value);
 }}/>
<label>Password</label>
<input type ="text" onChange={(e) => {setPasswordReg(e.target.value);
 }}
  />
<button onClick={register}> Register </button>

<div className="login">
<h1>Login</h1>
<input type ="text" placeholder ="Username"/>
<input type ="text" placeholder ="Password"/>
<button> Login </button>
</div>
</div>
);




return (
    <div className="App">
<h3 style={{color: "white"}}>Welcome to Blockchain Authentication</h3>

<Blockchain/>
</div>
);
}
export default App;

