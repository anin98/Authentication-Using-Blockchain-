import {useRef,useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import { useNavigate, useLocation} from "react-router-dom"
import * as api from "./Api";
import Home from "./Home";
import Swal from 'sweetalert2';


const Login =()=>{
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const [user, setUser]=useState('');
    const [pwd ,setPwd] = useState('');
    

    useEffect(() => { //the focus is on the input , using reference to store the component in the dependency

     },[]
    )

    const handleSubmit = async()=>{ //will handle the eventa

//        console.log(user,pwd);
        const res = await api.login({email:user, password:pwd});
        
        console.log(res)
//        setErrMsg(res.error||null)
        //setUser('');
        //setPwd('');
//        navigate(from, { replace: true });
        
        
        
 
    }
    
    return(
        
        
        <section>



            <h1>Sign In</h1>
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
                <button onClick={handleSubmit}> Sign In </button>
            <p>
                Need an Account? <br />
                <span className='line'>
                    {/*putting a router link*/}
                    <a href ="/register">Sign Up</a>
                </span>
            </p>

        </section>
        
    )
}

export default Login
