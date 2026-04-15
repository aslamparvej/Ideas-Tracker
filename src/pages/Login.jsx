import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import { useUser } from '../lib/context/user';
import { useIdeas } from '../lib/context/project';
import Loading from './Loading'


const Login = () => {
    const user = useUser();
    const ideas = useIdeas();
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [passsword, setPassword] = useState("");

    const [loading, setloading] = useState(false);

    const loginHandler = async () => {
        setloading(true)
        const loggedIn =  await user.login(email, passsword);
        if(loggedIn){
            navigate('/');
            ideas.init();
            setloading(false);
        }else {
            navigate('/login');
            setloading(false);
        }
    }

    return (
        <div className='form-container'>
            {loading && <Loading /> }
            <div className='login-container'>
                <h1 className='form-title'>Login</h1>
                <form action="">
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                    </div>
                    <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={passsword} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
                    </div>
                    <div className='button-container'>
                        <button className='custom-btn custom-btn-outline' type='reset' onClick={(e) => { setPassword(""); setEmail("")}}>Reset</button>
                        <button className='custom-btn custom-btn-primary' type='button' onClick={loginHandler}>Login</button>
                    </div>
                    <div className='link-container'> 
                        <p>Don't have an account? <Link to='/register'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;