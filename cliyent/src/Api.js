import axios from "axios";
import Swal from "sweetalert2";
import Blockchain from './blockchain';
import h2d from './tester';
const authenticate = new Blockchain();
var BigNumber = require('big-number');
const baseURL = process.env.REACT_APP_API_URL;
/* global BigInt */
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export const register = async (user) => {
  try {
    const res = await axios.post(`${baseURL}/register`, user);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Registered successfully",
    });

    window.location.assign("http://localhost:3000/home");
    let timestamp = Date.now();
    const data = await authenticate.createNewData(res.data.id, res.data.name, user.email,user.password,timestamp);
    var nonce = await authenticate.proofOfWork(0,data);
    var hash = await authenticate.hashBlock(0,data,nonce);
  const datapass = await axios.post(`${baseURL}/block`,{"data": data})
  console.log("The hash is "+ hash)
  let x = true
while (x === true) {
    var PublicKeyServer = await axios.get(`${baseURL}/pks`)
    console.log(PublicKeyServer.data)
    PublicKeyServer = parseInt(PublicKeyServer.data.PublicKeyServer)
    console.log(PublicKeyServer)
    var PublicKeyClient =h2d(hash)
    console.log("Public Key Client is "+PublicKeyClient)

    nonce = parseInt(nonce)
    console.log("nonce is")
    console.log(nonce)
    var brazil = BigNumber(PublicKeyClient).power(nonce)
    brazil = brazil.number.reverse()
    console.log(brazil)
    var TempKeyClient = BigNumber(brazil).mod(PublicKeyServer)
    if(parseInt(TempKeyClient)!==0){
        x=false;
    }
}
  console.log("TempKeyclient is "+TempKeyClient)

  var serversidevalue = await axios.post(`${baseURL}/tks`,{"tempkeyclient": TempKeyClient, "hashclient": hash, "PublicKeyServer":PublicKeyServer  })
  var TempKeyServer = serversidevalue.data.TempKeyServer
  console.log("TempKeyServer on client is "+ TempKeyServer )
  var nonceone = BigNumber(TempKeyServer).power(nonce)
  var NonceUnified = BigNumber(nonceone).mod(PublicKeyServer)
  console.log("NonceUnified on client side is "+ NonceUnified)
  const newdata = await authenticate.createNewData(res.data.id, res.data.name, user.email,user.password,timestamp);
  var hashunified = await authenticate.hashBlock(0,newdata,NonceUnified);
  console.log("Hash Unified is "+ hashunified)
  const block = await authenticate.createNewBlock(nonce,res.data.hash,hash);
  await(localStorage.setItem(`u-${res.data.id}` , JSON.stringify(block.data)))

    return { success: true, ...res.data };
  } catch (err) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Registered successfully",
    });

    return { success: false };
  }
};

export const login = async (user) => {
  try {
    const res = await axios.post(`${baseURL}/login`, user, {
      withCredentials: true,
    });



    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      idOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully",
    });

    let timestamp = Date.now();
    const data = await authenticate.createNewData(res.data.id, res.data.name, user.email,user.password,timestamp);
    var nonce = await authenticate.proofOfWork(0,data);
    var hash = await authenticate.hashBlock(0,data,nonce);
  const datapass = await axios.post(`${baseURL}/block`,{"data": data})
  console.log("The hash is "+ hash)
  let x = true
while (x === true) {
    var PublicKeyServer = await axios.get(`${baseURL}/pks`)
    console.log(PublicKeyServer.data)
    PublicKeyServer = parseInt(PublicKeyServer.data.PublicKeyServer)
    console.log(PublicKeyServer)
    var PublicKeyClient =h2d(hash)
    console.log("Public Key Client is "+PublicKeyClient)

    nonce = parseInt(nonce)
    console.log("nonce is")
    console.log(nonce)
    var brazil = BigNumber(PublicKeyClient).power(nonce)
    brazil = brazil.number.reverse()
    console.log(brazil)
    var TempKeyClient = BigNumber(brazil).mod(PublicKeyServer)
    if(parseInt(TempKeyClient)!==0){
        x=false;
    }
}
  console.log("TempKeyclient is "+TempKeyClient)

  var serversidevalue = await axios.post(`${baseURL}/tks`,{"tempkeyclient": TempKeyClient, "hashclient": hash, "PublicKeyServer":PublicKeyServer  })
  var TempKeyServer = serversidevalue.data.TempKeyServer
  console.log("TempKeyServer on client is "+ TempKeyServer )
  var nonceone = BigNumber(TempKeyServer).power(nonce)
  var NonceUnified = BigNumber(nonceone).mod(PublicKeyServer)
  console.log("NonceUnified on client side is "+ NonceUnified)
  const newdata = await authenticate.createNewData(res.data.id, res.data.name, user.email,user.password,timestamp);
  var hashunified = await authenticate.hashBlock(0,newdata,NonceUnified);
  console.log("Hash Unified is "+ hashunified)
  const block = await authenticate.createNewBlock(nonce,res.data.hash,hash);
  await(localStorage.setItem(`u-${res.data.id}` , JSON.stringify(hashunified)))

  window.location.replace("http://localhost:3000/home");


// const hashing = await axios.post(`${baseURL}/mine`, {"us_id":res.data.id,
//     "nonce": nonce+'',
//     "hash": hash});
//    console.log(hashing);
    return { success: true, ...res.data };
  } catch (err) {
    return { success: false };
  }
};
