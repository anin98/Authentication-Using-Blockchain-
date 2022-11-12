const sha256 = require('sha256');
function Blockchain(){
this.chain = [];
this.newData = [];
}

Blockchain.prototype.createNewBlock = function (nonce,prevhash,hash){
const newBlock ={
index: this.chain.length+1,
timestamp: Date.now(),
data: this.pendingData,
nonce: nonce,
hash: hash,
prevhash : prevhash 
};
this.pendingData = [];
this.chain.push(newBlock);
return newBlock;
}
Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length-1];
}
Blockchain.prototype.createNewData = function(id,name,email,password){
const newData={
    id:id,
    name: name,
    email: email,
    password: password
};
this.pendingData.push(newData);
return this.getLastBlock()['index'] +1;
}
Blockchain.prototype.hashBlock =function(prevhash,currentBlockData,nonce){
    nonce = "" + nonce;
    const dataAsString = prevhash + nonce+ JSON.stringify(currentBlockData);
    const hash =sha256(dataAsString);
    return hash;
}
Blockchain.prototype.proofOfWork = function(prevhash,currentBlockData){
    let nonce =0;
    let hash = this.hashBlock(prevhash,currentBlockData,nonce);
    var limit = Math.floor(Math.random() * 7);
    function upperbound(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }
    var lim = upperbound(0,limit);
    lim=lim.toString();
    while (hash.substring(0,limit)!=lim){
        nonce++;
        hash = this.hashBlock(prevhash, currentBlockData,nonce);
    }
return nonce;
}

module.exports = Blockchain; 