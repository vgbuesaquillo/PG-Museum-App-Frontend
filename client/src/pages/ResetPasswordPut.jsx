
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from "react-router-dom"
// import { resetPasswordPost } from '../redux/actions/userActions'
import './styles/ResetPasswordPut.css'
// import axios from 'axios';


import validate from '../utils/validatePassword'

const ResetPasswordPut = () => {
    const url = process.env.REACT_APP_URL_b;
    let navigate = useNavigate();
    const [input, setInput] = useState({
        password: '',
        passwordbis: '',
    });
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    const handleSend = async function (e) {
        try {
            if (Object.keys(errors).length === 0 && errors.constructor === Object && input.password !== '') {
                e.preventDefault()
                // axios.post("http://localhost:5040/auth/signup", postUser)
                //     .catch((error) => {
                //         // Falta validación específica del error o mensaje de cual fue el error
                //         console.log(error)
                //     })
                alert("Successfully update password")
                navigate('/login');
            } else {
                alert("Missing fields in the form")
                // navigate('/signup');
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = e => {
        console.log(url)
        console.log(process.env);
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    return (<div className="resetpasswordput">
        <div className="resetpasswordput__text">
            <h2>New password</h2>
            <h3>Let us help you retrieve your password.</h3>
            <p>
                Please enter your new password below.
            </p>
        </div>

        <div className='resetpasswordput__form'>
            <form onSubmit={handleSubmit} className='resetpasswordput__form--form'>
                <div>
                    <input onChange={handleChange} name="password" type="password" value={input.password}
                        placeholder='Password'
                    ></input>
                    {errors.password && <p className="signup__body--inputs--errors">{errors.password}</p>}
                </div>
                <div className="signup__body--inputs--form--item">
                    <input onChange={handleChange} name="passwordbis" type='password' value={input.passwordbis}
                        placeholder='Repeat password' />
                    {errors.passwordbis && <p className="signup__body--inputs--errors">{errors.passwordbis}</p>}
                </div>
                <button onClick={handleSend}>Submit</button>

            </form>
            <span className='resetpasswordput__form--span'>
                <NavLink to="/login">
                    Back to Login
                </NavLink>
            </span>
        </div>
    </div>);
}

export default ResetPasswordPut;