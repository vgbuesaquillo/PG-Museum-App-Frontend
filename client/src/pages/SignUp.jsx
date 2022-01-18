import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import validate from '../utils/validateSignUp'
import './styles/SignUp.css'
import logo from '../images/logoapp.svg'
import signUpImg from '../images/signup.svg'

const SignUp = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [status, setStatus] = useState();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        passwordbis: '',
        gender: '',
        status: status,
        legal: ["ine", "folio"]
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
        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            e.preventDefault()
            alert("Successfully post user")
            console.log("submit")
            navigate('/');
        } else {
            alert("Missing fields in the form")
            navigate('/signup');
        }
    }

    function handleCheck(e) {
        console.log(e.target.checked)
        console.log(status)
        if (e.target.checked) {
            setStatus({
                ...user,
                status: true
            })
        }
        console.log("check")
        console.log(user)
    }


    return (<div className='signup'>
        <div className="signup__header">
            <div>
                <img src={logo} alt="#" width="60px"></img>
                <label>Museum</label>
            </div>
            <div className="image__link" >
                <NavLink to="/" className="navlink" >Start </NavLink>
            </div>
        </div>

        <div className='signup__inputs'>
            <div className="inputText">

                <div className="inputText__title">
                    <label className="title__label">Sign up </label>
                    <br />
                    <span className="title__span">It's free, try it!</span>
                </div>
                <form onSubmit={onSubmit} className="inputText__form">
                    <div className="form__item">
                        <input onChange={onInputChange} name="username" type='text' value={user.username}
                            placeholder='Username' />
                    </div>
                    {errors.username && <p className="form__errors">{errors.username}</p>}
                    <div className="form__item">
                        <input onChange={onInputChange} name="email" type='email' value={user.email}
                            placeholder='Email' />
                    </div>
                    {errors.email && <p className="form__errors">{errors.email}</p>}
                    <div className="form__item">
                        <input onChange={onInputChange} name="password" type='password' value={user.password}
                            placeholder='Password' />
                    </div>
                    {errors.password && <p className="form__errors">{errors.password}</p>}
                    <div className="form__item">
                        <input onChange={onInputChange} name="passwordbis" type='password' value={user.passwordbis}
                            placeholder='Repeat password' />
                    </div>
                    {errors.passwordbis && <p className="form__errors">{errors.passwordbis}</p>}
                    <div>
                        <select name="temperament" onChange={onSelectChange} defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled>Select gender:</option>
                            <option value="mujer" >Mujer</option>
                            <option value="hombre" >Hombre</option>
                            <option value="otro" >Otro</option>
                        </select>
                        <div>
                            <input type='checkbox' name="seller" value="seller" onChange={(e) => handleCheck(e)} />
                            <label for="opt-in">wants to be a seller</label>
                        </div>
                        <div>
                            {user.status && user.legal.map((el, i) => {
                                <p key={i}>{el}</p>
                            })}
                            <p>adfs</p>
                        </div>
                        <input type='submit' value="Sign up" className="buildClass" />
                    </div>
                </form>
            </div>
            <div className="inputImage">
                <img src={signUpImg} width="50%" alt="#" className="image__image"></img>
            </div>

        </div>

    </div>

    );
}

export default SignUp;