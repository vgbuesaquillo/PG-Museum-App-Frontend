import React, { useState } from 'react';
import './styles/Login.css'
import {FcGoogle} from 'react-icons/fc'
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

    return(
        <div className= 'contenedor'>
            <div className= 'contenedor__content'>
                <div>
                    <div className= 'contenedor_logo'> 
                        <img src={image} alt="logo" className='navbar__logo'/>
                        Museum
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
                            <button className ="boton_log">Sing in</button>
                            <a href="/"><VscGithub/><b>GitHub</b></a>
                            <button className ="boton_log_google"><FcGoogle/> Sing In With Google</button>
                        </div>
                    </form>
                        
                        
                </div>
                
            </div>
            <div>
                <img src={image2} alt="imagen" />
            </div>
        </div>
    )
    

}

export default Login;