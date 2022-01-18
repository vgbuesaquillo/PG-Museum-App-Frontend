import React, { useState } from 'react';
// import { app } from '../config/firebase-config'
import { GoogleLogin } from 'react-google-login';
import './styles/Login.css'
//import {FcGoogle} from 'react-icons/fc'
import { BiX } from "react-icons/bi";
import {VscGithub} from 'react-icons/vsc'
import image from '../images/Group 1.svg'
import image2 from '../images/undraw_working_from_anywhere_re_9obt.svg'

function validate(input){
    let err ={};
    if (!input.email) {
        err.email = 'required email ';  
    } else if(!/\S+@\S+\.\S+/.test(input.email)){
        err.email = 'email invalid'
    }
    if (!input.password) {
        err.password = 'required password ';  
    } 
    else if(!/(?=.*[0-9])/.test(input.password)){
        err.password = 'password invalid'
    }
    return err
}

function Login(){

    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    
    const [error, setError] = useState({});

    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
            ? JSON.parse(localStorage.getItem('loginData'))
            : null
    );
    // const  [user, setUser] = useState(null);

    
    
    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        
    }
    const handleLogin = async(response) => {
        const res = await fetch('/api/google-login', {
            method: 'POST',
            body: JSON.stringify({
                token: response.tokenId,
            }),
            headers: {
                'content-type': 'application/json',
            },
        })
        console.log(response);
        const data = await response;
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data));
    }
    const handleFailure = (response) => {
        console.log(response);
    }
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
        
    }
    

    return(
        <div className= 'contenedor'>
            <div className= 'contenedor__content'>
                <div>
                    <div className= 'contenedor_logo'> 
                        <img src={image} alt="logo" className='navbar__logo'/>
                        <div>Museum</div>
                        
                    </div>
                    <h1>Sing in</h1>
                    <form  >
                        <div>
                            <input className={error.email && 'danger'}
                                type="text" 
                                name = 'email'
                                onChange={handleChange}
                                value={input.email}
                                placeholder='email'
                            />{error.email &&(
                                <p className="danger">{error.email}</p>
                            ) } 
                        </div>
                        <div>
                            <input className={error.password && 'danger'}
                                type="password"
                                name = "password"
                                onChange={handleChange}
                                value={input.password}
                                placeholder='password'
                            />
                            {error.password &&(
                                <p className="danger">{error.password}</p>
                                ) }    
                        </div>

                        <h4><a href="/">Olvidaste tu contraseña?</a></h4>
                        <div className = 'contenedor_submit'>
                            <div className ='div_log'><button className ="boton_log">Sing in</button></div>
                            
                            <a href="/"><VscGithub/><> </><b>GitHub</b></a>
                            {
                                loginData? (
                                    <div>
                                        <h2>You logged in as {loginData.email}</h2>
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                ): (
                                    <div className ='bott_google'>
                                        <GoogleLogin
                                        clientId="359276887661-52enkr7gjhn5m9hm3e3t45jumqjnfnvj.apps.googleusercontent.com"
                                        buttonText="Sign In with Google"
                                        onSuccess={handleLogin}
                                        onFailure={handleFailure}
                                        cookiePolicy={'single_host_origin'}
                                    /> </div>
                                   
                                )
                            }
                            
                            {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
                            {/* <button className ="boton_log_google"><FcGoogle/> Sing In With Google</button> */}
                        </div>
                    </form>
                        
                        
                </div>
                
            </div>
            <div className="img_page">
                <img src={image2} alt="imagen" />
            </div>
            <div className="log_Bix"> <a href="/"><BiX/></a></div>
        </div>
    )
    

}

export default Login;