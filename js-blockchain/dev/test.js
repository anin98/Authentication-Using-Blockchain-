const Blockchain = require('./blockchain');
const authenticate = new Blockchain();

// authenticate.createNewBlock(2389,'asgshe','12gsbw');
// authenticate.createNewBlock(2382,'asgs22e','12gs12bw');

// authenticate.createNewData(24,'Anindita','anin@gmail.com','pass');

const prevhash ='gsywgywgy12354'

const currentBlockData = [
    {
    id: 2,
    name: 'sofia',
    email : 'sofia@hmail.com',
    password: 'luffy'
    },
    {
        id: 3,
        name: 'raima',
        email : 'raima@hmail.com',
        password: 'levi'
        }
 
];


console.log(authenticate.proofOfWork(prevhash,currentBlockData));