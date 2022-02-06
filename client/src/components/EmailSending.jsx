import React, { Component } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


export default class email_sending extends Component {
    
    email = React.createRef();
    subject = React.createRef();
    message = React.createRef();

    state = {
        email: '',
        subject: '',
        message: '',
    }

    handleChange = (e) => {
        var email = this.email.current.value;
        var subject = this.subject.current.value;
        var message = this.message.current.value;
        this.setState({
            email: email,
            subject: subject,
            message: message,
        })
    }

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // `${url}/`
    async handleSubmit(e) {
        e.preventDefault();
        const url = process.env.REACT_APP_URL;
        const { email, subject, message } = this.state;
        const form = await axios.post(`${url}/sendemail`, { 
            email, 
            subject, 
            message });
        console.log(form);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="text" ref={this.email} placeholder="Email" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Subject</label>
                        <input type="text" ref={this.subject} placeholder="Subject" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                        <textarea ref={this.message} placeholder="Message" />
                    </div>
                    <div class="mb-3">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}
