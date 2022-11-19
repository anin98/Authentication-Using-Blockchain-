import axios from "axios";
import Swal from "sweetalert2";
import Blockchain from './blockchain';
const authenticate = new Blockchain();
const baseURL = process.env.REACT_APP_API_URL;

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

    //window.location.assign("http://localhost:3000/login");
    const data = await authenticate.createNewData(res.data.id, user.name, user.email,user.password);
    const nonce = await authenticate.proofOfWork(0,data);

    const hash = await authenticate.hashBlock(0,data,nonce);
    const block = await authenticate.createNewBlock(nonce,0,hash);
  console.log(data)
  console.log(nonce)
  console.log(hash);
  console.log(block)
  const hashing = await axios.post(`${baseURL}/mine`, {"us_id":res.data.id,
    "nonce": nonce+'',
    "hash": hash});
   console.log(hashing);
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

    //window.location.replace("http://localhost:3000/home");

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
    await(localStorage.setItem('userID', res.data))
    const data = await authenticate.createNewData(res.data.id, user.name, user.email,user.password);
    const nonce = await authenticate.proofOfWork(res.data.hash,data);

    const hash = await authenticate.hashBlock(res.data.hash,data,nonce);
    const block = await authenticate.createNewBlock(nonce,res.data.hash,hash);
  console.log(data)
  console.log(nonce)
  console.log(hash);
  console.log(block)
const hashing = await axios.post(`${baseURL}/mine`, {"us_id":res.data.id,
    "nonce": nonce+'',
    "hash": hash});
   console.log(hashing);
    return { success: true, ...res.data };
  } catch (err) {
    return { success: false };
  }
};
