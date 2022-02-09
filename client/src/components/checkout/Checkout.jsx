import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from "sweetalert2";
import '../styles/checkout.css'

const Checkout = () => {

    const user = localStorage?.session ? JSON.parse(localStorage.session) : null
    const total = useSelector(state => state.allProductsReducer.totalCount)
    const products = useSelector(state => state.allProductsReducer.allproducts)
    const url = process.env.REACT_APP_URL;


    const [state, setState] = useState({
        name: '',
        username: '',
        email: '',
        address: '',
        country: '',
        state: '',

    })

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    console.log(state);

    const handleNextCheckout = () => {
        if (state.email !== '' || state.username !== '' || state.name !== '' || state.address !== '' || state.country !== '') {
            fetch(`${url}/sendemail`, {
                method: 'POST',
                body: JSON.stringify({
                    email: state.email,
                    subject: 'Confirm checkout',
                    message: `Esperamos la confirmacion del pago para que llegue a tu direccion ${state.address} ${state.state} ${state.country}`
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(data => data.json())
                .then(result => {
                    setState({ name: '', username: '', email: '', address: '', country: '', state: '' })
                    // window.location.href= '/mercadoPagoForm'
                })
        } else {
            Swal.fire("Debes completar todos los campos")
        }
    }

    const handleNextCheckout2 = () => {
        if (state.email !== '' || state.username !== '' || state.name !== '' || state.address !== '' || state.country !== '') {
            fetch(`${url}/sendemail`, {
                method: 'POST',
                body: JSON.stringify({
                    email: state.email,
                    subject: 'Confirm checkout',
                    message: `Le enviamos el sigiente codigo QR para su orden de compra, recuerde que tiene 24 horas para realizar el pago. => https://latam.kaspersky.com/content/es-mx/images/repository/isc/2020/9910/a-guide-to-qr-codes-and-how-to-scan-qr-codes-2.png ${state.address} ${state.state} ${state.country}`
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(data => data.json())
                .then(result => {
                    setState({ name: '', username: '', email: '', address: '', country: '', state: '' })
                    // window.location.href= '/mercadoPagoForm'
                })
        } else {
            Swal.fire("Debes completar todos los campos")
        }
    }

    // const handlePaymentQR = () => {
    //     const paymentFetch = async () => {
    //         let qr = {
    //             status: 'in_process',
    //             status_detail: 'accredited',
    //             id: 1245935830,
    //             date_created: '2022-02-09T11:34:14.118-04:00',
    //             date_approved: '2022-02-09T11:34:14.224-04:00',
    //             operation_type: 'regular_payment',
    //             issuer_id: 2,
    //             payment_type_id: 'credit_card',
    //             currency_id: 'ARS',

    //         }
    //         const response = await fetch(
    //             `${url}/payment/db/post`,
    //             {
    //                 method: "POST",
    //                 body: JSON.stringify(qr),
    //                 headers: {
    //                     "Access-Control-Allow-Origin": "*",
    //                     "Access-Control-Request-Method":
    //                         "GET, POST, DELETE, PUT, OPTIONS",
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //         const data = await response.json();
    //         console.log(data);
    //     };
    //     paymentFetch();
    // }




    return (
        <div className="maincontainer w-100">
            <div class="container">
                <div class="py-5 text-center">
                    <h2>Checkout buy</h2>
                </div>
                <div class="row">
                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">Your cart</span>
                            <span class="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul class="list-group mb-3">
                            <div className='products-scroll'>
                                {
                                    products.length !== 0 ? products.map(product => (
                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 class="my-0">{product?.title}</h6>
                                                <small class="text-muted">{product?.creators_description}</small>
                                            </div>
                                            <span class="text-muted">${product?.price}</span>
                                        </li>
                                    )) :
                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 class="my-0">No items in store</h6>
                                                <small class="text-muted">try to add products for buy</small>
                                            </div>
                                        </li>
                                }
                            </div>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${total}</strong>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">Billing address</h4>
                        <form class="needs-validation" novalidate>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="firstName">Full name</label>
                                    <input type="text" class="form-control" id="firstName" placeholder="" required onChange={handleInputChange} name='name' />
                                    <div class="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="lastName">Username</label>
                                    <input type="text" class="form-control" id="lastName" placeholder="" required onChange={handleInputChange} name='username' />
                                    <div class="invalid-feedback">
                                        Valid last Username is required.
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="you@example.com" onChange={handleInputChange} name='email' />
                                <div class="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="address">Address</label>
                                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required onChange={handleInputChange} name='address' />
                                <div class="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <select class="custom-select d-block w-100" id="country" required onChange={handleInputChange} name='country'>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="state">State</label>
                                    <select class="custom-select d-block w-100" id="state" required onChange={handleInputChange} name='state'>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                            </div>
                            <hr class="mb-4" />
                            <Link to="/mercadoPagoForm"
                                state={{ products: products }}
                                onClick={handleNextCheckout}
                            >Mercado pago</Link>
                            <button class="btn btn-primary btn-lg btn-block" type="button" onClick={handleNextCheckout2}>QR Code</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>);
}

export default Checkout;