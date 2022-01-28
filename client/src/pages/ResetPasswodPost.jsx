
// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { resetPasswordPost } from '../redux/actions/userActions'
import './styles/ResetPasswordPost.css'
// import axios from 'axios';

const ResetPasswordPost = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email: '',
    })

    const handleSend = async function () {
        try {
            await dispatch(resetPasswordPost(input.email));
        }
        catch (error) {
            console.log(error)
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
        <div className='resetpaswordpost__text'>
            <h2>Password reset</h2>
            <h3>Let us help you retrieve your password.</h3>
            <p>
                Please enter your e-mail address below.
            </p>
        </div>

        <div className=''>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleChange} value={input.email} ></input>
                <button onClick={handleSend}>Submit</button>

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