import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { BsFillXCircleFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import validate from '../utils/validateSignUp'
import './styles/SignUp.css'
import logo from '../images/logoapp.svg'
import signUpImg from '../images/signup.svg'
import axios from 'axios';

const SignUp = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [status, setStatus] = useState();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        passwordbis: ''
    });
    const [errors, setErrors] = useState({})

    function onInputChange(e) {
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...user,
            [e.target.name]: e.target.value
        }))
    }

    function register(postUser) {
        axios.post("http://localhost:5040/create", postUser)
            .catch((error) => {
                console.log(error)
            })
    }

    function onSubmit(e) {
        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            e.preventDefault()
            alert("Successfully put user")
            navigate('/');
        } else {
            alert("Missing fields in the form")
            navigate('/signup');
        }
    }



    return (<div className='signup'>
        <div className="signup__header">
            <div className="signup_header--logo">
                <img src={logo} alt="#" width="60px"></img>
                <label className="signup_header--logo--label">Museum</label>
            </div>
            <div className="signup__header--link" >
                <NavLink to="/" className="navlink" ><BsFillXCircleFill /></NavLink>
            </div>
        </div>

        <div className='signup__body'>
            <div className="signup__body--inputs">

                <div className="signup__body--inputs--text">
                    <h1 className="signup__inputs--text--label">Sign up </h1>
                    <span className="signup__inputs--text--span">It's free, try it!</span>
                </div>
                <form onSubmit={onSubmit} className="signup__body--inputs--form">
                    <div className="signup__body--inputs--form--item">
                        <input onChange={onInputChange} name="username" type='text' value={user.username}
                            placeholder='Username' />
                    </div>
                    {errors.username && <p className="signup__body--inputs--errors">{errors.username}</p>}
                    <div className="signup__body--inputs--form--item">
                        <input onChange={onInputChange} name="email" type='email' value={user.email}
                            placeholder='Email' />
                    </div>
                    {errors.email && <p className="signup__body--inputs--errors">{errors.email}</p>}
                    <div className="signup__body--inputs--form--item">
                        <input onChange={onInputChange} name="password" type='password' value={user.password}
                            placeholder='Password' />
                    </div>
                    {errors.password && <p className="signup__body--inputs--errors">{errors.password}</p>}
                    <div className="signup__body--inputs--form--item">
                        <input onChange={onInputChange} name="passwordbis" type='password' value={user.passwordbis}
                            placeholder='Repeat password' />
                    </div>
                    {errors.passwordbis && <p className="signup__body--inputs--errors">{errors.passwordbis}</p>}
                    <button className="signup__body--inputs--form--submit">Sign up</button>
                </form>
            </div>
            <div className="signup__body--image">
                <img src={signUpImg} width="50%" alt="#" className="signup__body--image--image"></img>
            </div>

        </div>

    </div>

    );
}

export default SignUp;