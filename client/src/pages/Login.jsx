import './styles/Login.css'
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { BiX } from "react-icons/bi";
import {VscGithub} from 'react-icons/vsc'
import image from '../images/Group 1.svg'
import image2 from '../images/undraw_working_from_anywhere_re_9obt.svg'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'


const baseUrl = 'http://localhost:3002/usuarios';
const baseUrlOne = "http://localhost:5040/auth/signin";
const cookies = new Cookies();
// if(cookies.get("username")){
//     window.location.href = "./admin";
// } 

function validate(input){
    let err ={};
    // if (!input.email) {
    //     err.email = 'required email ';  
    // } else if(!/\S+@\S+\.\S+/.test(input.email)){
    //     err.email = 'email invalid'
    // }
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
        username: '',
        password: ''
    });
    
    const [error, setError] = useState({});

    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
            ? JSON.parse(localStorage.getItem('loginData'))
            : null
    );
    // const  [user, setUser] = useState(null); 

    useEffect( ()=> {
        if(cookies.get("username")){
            window.location.href = "./admin";
        } 
    })

    const iniciadora = async(e)=>{
        e.preventDefault();
        await axios.post(baseUrlOne, input)
        .then((response)=>{
            return response.data
        })
        .then(response => {
            console.log(response);
            if(response){
                // var respuesta = response[0];
                // cookies.set("name", respuesta.name, {path:'/'});
                cookies.set("email", response.email, {path:'/'});
                cookies.set("username", response.username, {path:'/'});
                // cookies.set("registro", respuesta.registro, {path:'/'});
                cookies.set("tipoUser", response.roles, {path:'/'});
                window.location.href = '/admin';
            }else{
                alert("Usuario o contraseña incorrectos...")
            }

        })

    }

    const iniciaSesion = async(e) =>{
        e.preventDefault();
        await axios.get(baseUrl, { params: {email: input.email, password: md5(input.password)}})
        .then( response =>{
            return response.data;
        })
        // .then(response => {
            
        //     if(response.length > 0){
        //         var respuesta = response[0];
        //         // cookies.set("name", respuesta.name, {path:'/'});
        //         cookies.set("email", respuesta.email, {path:'/'});
        //         cookies.set("userName", respuesta.userName, {path:'/'});
        //         // cookies.set("registro", respuesta.registro, {path:'/'});
        //         cookies.set("tipoUser", respuesta.tipoUser, {path:'/'});
        //         window.location.href = '/admin';
        //     }else{
        //         alert("Usuario o contraseña incorrectos...")
        //     }

        // })

        .catch(err =>{
            console.log(err);
        })
    }
    
    
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
    const handleLogin = async(googleData) => {
        const res = await fetch('http://localhost:5040/auth/signin/google', {
            method: 'POST',
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                'content-type': 'application/json',
            },
        })
        
        console.log(googleData);
        console.log(res);
        const data = await res.json();
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
                            <input className={error.username && 'danger'}
                                type="text" 
                                name = 'username'
                                onChange={handleChange}
                                value={input.username}
                                placeholder='username'
                            />{error.username &&(
                                <p className="danger">{error.username}</p>
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
                            <div className ='div_log'><button className ="boton_log" onClick={iniciadora}>Sing in</button></div>
                            
                            <a href="/"><VscGithub/><> </><b>GitHub</b></a>
                            {
                                loginData? (
                                    <div>
                                        <h2>You logged in as {loginData.profileObj.email}</h2>
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