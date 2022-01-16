import React, { useState } from "react";
import { NavLink } from "react-router-dom"

import validate from '../utils/validateSignUp'
import './styles/SignUp.css'
import logo from '../images/logoapp.svg'
import signUpImg from '../images/signup.svg'

const SignUp = () => {
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        passwordbis: '',
        gender: '',
        status: false
    });

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

    function onSelectChange(e) {
        setUser({
            ...user,
            temperament: [...user.gender, e.target.value]
        })
        setErrors(validate({
            ...user,
            temperament: [...user.gender, e.target.value]
        }))
    }

    function onSubmit(e) {
        e.preventDefault()
        console.log("submit")
    }

    return (<div className='signup'>
        <div className="signup_header">
            <img src={logo} alt="#" width="60px"></img>
            <label>Museum</label>
        </div>

        <div className='signup_inputs'>
            <div className="inputText">

                <div className="inputText_title">
                    <label className="title__label">Sign up </label>
                    <br />
                    <span className="title__span">It's free, try it!</span>
                </div>
                <form onSubmit={onSubmit} className="inputText__form">
                    <div className="form__item">
                        <input onChange={onInputChange} name="username" type='text' value={user.username}
                            placeholder='Username' />
                    </div>
                    {errors.username && <p className="errors">{errors.username}</p>}
                    <div className="form__item">
                        <input onChange={onInputChange} name="email" type='text' value={user.email}
                            placeholder='Email' />
                    </div>
                    {errors.email && <p className="errors">{errors.email}</p>}
                    <div className="form__item">
                        <input onChange={onInputChange} name="password" type='text' value={user.password}
                            placeholder='Password' />
                    </div>
                    {errors.password && <p className="errors">{errors.password}</p>}
                    <div className="form__item">
                        <input onChange={onInputChange} name="passwordbis" type='text' value={user.passwordbis}
                            placeholder='Repeat password' />
                    </div>
                    {errors.passwordbis && <p className="errors">{errors.passwordbis}</p>}
                    <div>
                        <select name="temperament" onChange={onSelectChange} defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled>Select gender:</option>
                            <option value="mujer" >Mujer</option>
                            <option value="hombre" >Hombre</option>
                            <option value="otro" >Otro</option>
                        </select>
                        <div>
                            <input type='checkbox' name="seller" value="seller" />
                            <label for="opt-in">wants to be a seller</label>
                        </div>
                        <input type='submit' value="Sign up" className="buildClass" />
                    </div>
                </form>
            </div>
            <img src={signUpImg} width="60%" alt="#" ></img>

        </div>
        <div>
            <NavLink to="/" className="navlink" >Start </NavLink>
        </div>

    </div>

    );
}

export default SignUp;