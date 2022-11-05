import {useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import { useNavigate, useLocation} from "react-router-dom"
import * as api from "./Api";
import Swal from 'sweetalert2';

const Register =()=>{
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [name, setName]=useState('');
    const [user, setUser]=useState('');
    const [pwd ,setPwd] = useState('');
    

    useEffect(() => { //the focus is on the input , using reference to store the component in the dependency

     },[]
    )

    const handleSubmit = async()=>{ //will handle the eventa

//        console.log(user,pwd);
        const res = await api.register({name:name, email:user, password:pwd});
        console.log(res)
//        setAuth({user,pwd})
//        setErrMsg(res.error||null)
        //setUser('');
        //setPwd('');
//        navigate(from, { replace: true });

    

    }

    return(


        <section>



            <h1>Sign Up</h1>
            <label htmlFor ="name"> Name:</label>
                <input
                type ="text"


                autoComplete ="off"
                onChange={(e) => setName(e.target.value)} // set the anon function to userstate
                value ={name}
                required //clear the form upon submission
                />
                <label htmlFor ="email"> Email:</label>
                <input
                type ="text"


                autoComplete ="off"
                onChange={(e) => setUser(e.target.value)} // set the anon function to userstate
                value ={user}
                required //clear the form upon submission
                />
                <label htmlFor ="password"> Password:</label>
                <input
                type ="password"

                onChange={(e) => setPwd(e.target.value)} // set the anon function to userstate
                value ={pwd}
                required //clear the form upon submission
                />
                <button onClick={handleSubmit}> Sign Up </button>
            <p>
                Need an Account? <br />
                <span className='line'>
                    {/*putting a router link*/}
                    <a href ="/login">Sign In</a>
                </span>
            </p>

        </section>

    )
}

export default Register;
