//import React from "react";
const Blockchain = require('./blockchain');
const authenticate = new Blockchain();

// authenticate.createNewBlock(2389,'asgshe','12gsbw');
// console.log(authenticate.createNewBlock(2382,'asgs22e','12gs12bw'));

console.log(authenticate.createNewData(24,'Anindita','anin@gmail.com','pass'));
console.log(authenticate.createNewBlock(2382,'asgs22e','12gs12bw'));

const prevhash ='gsywgywgy12354'



const currentBlockData = [
    {
    id: 24,
    name: 'Anindita',
    email : 'anin@gmail.com',
    password: 'pass'
    }
    
 
];

//console.log(authenticate);
//console.log(authenticate.hashBlock(prevhash,currentBlockData,46));
console.log(authenticate.proofOfWork(prevhash,currentBlockData));