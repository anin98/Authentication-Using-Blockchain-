import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

const db = mysql.createConnection({
user: "root",
host: "localhost",
password: "password",
database:"blockchain_authentication",
});
app.post('/register',(req,res)=> {
const name = req.body.name
const email = req.body.email
const password = req.body.password
db.query("INSERT INTO registration (name,email,password) VALUES (?,?,?)",
[name,email,password],
(err,result) => {
console.log(err);
}
);
});
app.listen(3000,() => {
console.log("running server");
});

