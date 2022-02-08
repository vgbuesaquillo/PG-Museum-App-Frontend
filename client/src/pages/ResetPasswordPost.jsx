import React, { useState } from 'react'
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import './styles/ResetPasswordPost.css'
import axios from 'axios';
import Swal from "sweetalert2";


const ResetPasswordPost = () => {
    const location = useLocation()
    const state = location.state
    console.log("state", state)
    let navigate = useNavigate();
    const url = process.env.REACT_APP_URL
    const [input, setInput] = useState({
        email: '',
    })

    const handleSend = async function () {
        if (state) {
            try {
                axios.post(`${url}/forgot-password`, { email: state.email })
                    .then((response) => {
                        return response.data
                    })
                    .then(response => {
                        Swal.fire(response.message);
                        navigate('/admin');
                    })
                    .catch((error) => {
                        // Falta validación específica del error o mensaje de cual fue el error
                        console.log(error)
                    })
            }
            catch (error) {
                console.log(error)
            }
        } else {
            try {
                axios.post(`${url}/forgot-password`, { email: input.email })
                    .then((response) => {
                        return response.data
                    })
                    .then(response => {
                        Swal.fire(response.message);
                        navigate('/login');
                    })
                    .catch((error) => {
                        // Falta validación específica del error o mensaje de cual fue el error
                        console.log(error)
                    })
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    return (<div className='resetpaswordpost'>
        {
            !state ?
                <div className='resetpaswordpost__text'>
                    <h2>Password reset</h2>
                    <h3>Let us help you retrieve your password.</h3>
                    <p>
                        Please enter your e-mail address below.
                    </p>
                </div>
                : null
        }

        <div className=''>
            <form onSubmit={handleSubmit}>
                {
                    !state ?
                        <input type="email" name="email" onChange={handleChange} value={input.email} ></input>
                        : null
                }
                {
                    !state ?
                        <button onClick={handleSend}>Submit</button>
                        : <button onClick={handleSend}>Submit reset password</button>
                }

            </form>
            <span>
                <NavLink to="/login">
                    Back to Login
                </NavLink>
            </span>
        </div>
    </div>);
}

export default ResetPasswordPost;