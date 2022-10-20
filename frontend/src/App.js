import React, {useState,useEffect} from 'react';
import Axios from 'axios'
import {API_BASE_URL} from './config';
import './App.css';
import Blockchain from './Blockchain';
function App() {




return (
    <div className="App">
<h3 style={{color: "white"}}>Welcome to Blockchain Authentication</h3>

<Blockchain/>
</div>
);
}
export default App;

