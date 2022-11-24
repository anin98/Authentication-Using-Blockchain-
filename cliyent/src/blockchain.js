const sha256 = require('sha256');
//class Blockchain {
//constructor(chain = [], newData = [],pendingData = [])
//createNewBlock(nonce, prevhash, hash){
    let  timestamp ;

function Blockchain() {
    this.chain = [];
    this.newData = [];
    this.pendingData = [];
    // this.createNewBlock(100,'0','0');
}

Blockchain.prototype.createNewBlock = function (nonce, prevhash, hash) {

    const newBlock = {
        index: this.chain.length + 1,
        data: this.pendingData,
        nonce: nonce,
        hash: hash,
        prevhash: prevhash
    };
    // this.getLastBlock()['index'] + 1;
    this.chain.push(newBlock);
    return newBlock;
}
Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
}
//first we have to call this
Blockchain.prototype.createNewData = async function (id, name, email, password, timestamp) {
    // console.log(id);
    // console.log(name);
    // console.log(email);
    // console.log(password);    
    const newData = {
        id: id,
        name: name,
        email: email,
        password: password,
        timestamp: timestamp
    };
    
    this.pendingData.push(newData);
    return newData;
}
//third we have to call this
Blockchain.prototype.hashBlock = async function (prevhash, currentBlockData, nonce) {
    nonce = "" + nonce;
    const dataAsString = prevhash + nonce + JSON.stringify(currentBlockData);
    var hash = sha256(dataAsString)
    return hash;
}
//second we have to call this
Blockchain.prototype.proofOfWork = async function (prevhash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(prevhash, currentBlockData, nonce);
    var limit = 2
//    Math.floor(Math.random() * 2);
    limit = limit.toString();
    
    function upperbound(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }
    //00eyueieoe383
    var lim = upperbound('0', limit);
    lim = lim.toString();
    while ((await hash).substring('0', limit) != lim) {
        nonce++;
        hash = this.hashBlock(prevhash, currentBlockData, nonce);
        
    }
    return nonce;
}
module.exports = Blockchain;
//export default Blockchain;
