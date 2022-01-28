import './styles/Login.css'
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { BiX } from "react-icons/bi";
import { VscGithub } from 'react-icons/vsc'
import image from '../images/Group 1.svg'
import image2 from '../images/undraw_working_from_anywhere_re_9obt.svg'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'
import { NavLink } from 'react-router-dom';


const singin = "http://localhost:5040/auth/signin";
const cookies = new Cookies();

function validate(input) {
    let err = {};
    // if (!input.email) {
    //     err.email = 'required email ';  
    // } else if(!/\S+@\S+\.\S+/.test(input.email)){
    //     err.email = 'email invalid'
    // }
    if (!input.password) {
        err.password = 'required password ';
    }
    else if (!/(?=.*[0-9])/.test(input.password)) {
        err.password = 'password invalid'
    }
    return err
}

function Login() {

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

    useEffect(() => {
        if (cookies.get("session")) {
            window.location.href = "/";
        }
    })

    //* COMPLETE FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(singin, input)
            .then((response) => {
                return response.data
            })
            .then(response => {
                console.log(response);
                if (response) {
                    cookies.set("session", response);
                    window.location.href = '/';
                } else {
                    alert("Usuario o contraseña incorrectos...")
                }

            })
    }

    function handleChange(e) {
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

    const handleLoginGoogle = async (googleData) => {
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

    // #Holamundo23
    return (
        <div className='contenedor'>
            <div className='contenedor__content'>
                <div>
                    <div className='contenedor_logo'>
                        <img src={image} alt="logo" className='navbar__logo' />
                        <div>Museum</div>

                    </div>
                    <h1>Sing in</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input className={error.username && 'danger'}
                                type="text"
                                name='username'
                                onChange={handleChange}
                                value={input.username}
                                placeholder='username'
                            />{error.username && (
                                <p className="danger">{error.username}</p>
                            )}
                        </div>
                        <div>
                            <input className={error.password && 'danger'}
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={input.password}
                                placeholder='password'
                            />
                            {error.password && (
                                <p className="danger">{error.password}</p>
                            )}
                        </div>
                        <h4>
                            <NavLink to="/resetPasswordPost">
                                Olvidaste tu contraseña?
                            </NavLink>
                        </h4>
                        <div className='contenedor_submit'>
                            <input type="submit" className='boton_log' />

                            <a href="/"><VscGithub /><> </><b>GitHub</b></a>
                            {
                                loginData ? (
                                    <div>
                                        <h2>You logged in as {loginData.profileObj.email}</h2>
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                ) : (
                                    <div className='bott_google'>
                                        <GoogleLogin
                                            clientId="359276887661-52enkr7gjhn5m9hm3e3t45jumqjnfnvj.apps.googleusercontent.com"
                                            buttonText="Sign In with Google"
                                            onSuccess={handleLoginGoogle}
                                            onFailure={handleFailure}
                                            cookiePolicy={'single_host_origin'}
                                        /> </div>

                                )
                            }

                        </div>
                    </form>


                </div>

            </div>
            <div className="img_page">
                <img src={image2} alt="imagen" />
            </div>
            <NavLink to='/'>
                <div className="log_Bix"><BiX /></div>
            </NavLink>
        </div>
    )


}

export default Login;