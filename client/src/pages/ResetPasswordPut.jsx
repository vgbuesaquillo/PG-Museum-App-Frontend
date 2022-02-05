
import React, { useState, useEffect ,} from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate, Link } from "react-router-dom"
// import { resetPasswordPost } from '../redux/actions/userActions'
import './styles/ResetPasswordPut.css'
/* import axios from 'axios'; */
import queryString from 'query-string';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService, alertService} from '../services'
import {history} from '../utils/history'
import validate from '../utils/validatePassword';


function ResetPasswordPut({ history }) {
    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }
    
    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

    useEffect(() => {
        const { token } = queryString.parse(window.location.search);

        // remove token from url to prevent http referer leakage
     /*    history.replace(window.location.pathname);
 */
        accountService.validateResetToken(token)
            .then(() => {
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            })
            .catch(() => {
                setTokenStatus(TokenStatus.Invalid);
            });
    }, []);

    function getForm() {
        const initialValues = {
            password: '',
            confirmPassword: ''
        };

        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        });

        function onSubmit({ password, confirmPassword }, { setSubmitting }) {
            alertService.clear();
            accountService.resetPassword({ token, password, confirmPassword })
                .then(() => {
                    alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true });
                    history.push('/login');
                })
                .catch(error => {
                    setSubmitting(false);
                    alertService.error(error);
                });
        }

        return (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label>Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Reset Password
                                </button>
                                <Link to="./login" className="btn btn-link">Cancel</Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }

    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Valid:
                return getForm();
            case TokenStatus.Invalid:
                return <div>Token validation failed, if the token has expired you can get a new one at the <Link to="forgot-password">forgot password</Link> page.</div>;
            case TokenStatus.Validating:
                return <div>Validating token...</div>;
        }
        
    }

    return (
        <div>
            <h3 className="card-header">Reset Password</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}





/* 
const ResetPasswordPut = () => {

    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }
    
    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

    useEffect(() => {
        const { token } = queryString.parse(location.search);

        // remove token from url to prevent http referer leakage
        history.replace(location.pathname);

        accountService.validateResetToken(token)
            .then(() => {
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            })
            .catch(() => {
                setTokenStatus(TokenStatus.Invalid);
            });
    }, []);

    ////////////////////

    const url = process.env.REACT_APP_URL;
    let navigate = useNavigate();
    const [input, setInput] = useState({
        password: '',
        passwordbis: '',
    });
    const [errors, setErrors] = useState({})
    // const dispatch = useDispatch()

    const handleSend = async function (e) {
        try {
            if (Object.keys(errors).length === 0 && errors.constructor === Object && input.password !== '') {
                e.preventDefault()
                alertService.clear();
            accountService.resetPassword({ token, password, confirmPassword })
                .then(() => {
                    alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true });
                    history.push('login');
                })
                .catch(error => {
                    setSubmitting(false);
                    alertService.error(error);
                });
            } else {
                alert("Missing fields in the form")
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
 */
export default ResetPasswordPut;