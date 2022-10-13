import React, {useState,useEffect} from 'react';
import {API_BASE_URL} from './config';
import './App.css';
import Blockchain from './Blockchain';
function App() {


return (
    <div className="App">
<h3>Welcome to Blockchain Authentication</ h3>

<Blockchain/>
</div>
);
}
export default App;

