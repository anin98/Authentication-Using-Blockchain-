import axios from "axios"
import Swal from 'sweetalert2';

const baseURL = process.env.REACT_APP_API_URL;



axios.interceptors.request.use((config) =>{

    const token =localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
}


)

export const register =async(user)=>{
    try{
        const res= await axios.post(`${baseURL}/register`, user);
        
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Registered successfully'
        })

        window.location.assign("http://localhost:3000/login");

        return{success: true, ...res.data};
    }
    
    catch(err){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Registered successfully'
        })
       return{success:false}
    }
}

export const login =async(user)=>{
//console.log(user)
    try{
        const res= await axios.post(`${baseURL}/login`, user);

        window.location.assign("http://localhost:3000/home");

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            idOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
        })

        return{success: true, ...res.data};
    }

    catch(err){
       return{success:false}
    }
}

