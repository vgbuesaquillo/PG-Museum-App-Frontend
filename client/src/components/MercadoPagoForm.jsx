import React, { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "./formConfig";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useLocation } from "react-router-dom"
const url = process.env.REACT_APP_URL;

const INITIAL_STATE = {
    cvc: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    focus: "cardNumber",
    cardholderName: "",
    cardNumber: "",
    issuer: "",
};

export default function MercadoPagoForm() {
    const location = useLocation()
    const stateProducts = location.state
    console.log("stateProducts", stateProducts)
    let productsFilter = [];
    let totalFilter = 0;
    stateProducts?.products.map((p) => {
        let product = p.price;
        productsFilter.push(product);
        totalFilter += p.price;
    })
    console.log("totalFilter", totalFilter)

    const [state, setState] = useState(INITIAL_STATE);
    //const resultPayment = useMercadoPago();
    const user = localStorage?.session ? JSON.parse(localStorage.session) : null
    const [resultPayment, setResultPayment] = useState(undefined);
    console.log("resultPayment", resultPayment)
    const { MercadoPago } = useScript(
        "https://sdk.mercadopago.com/js/v2",
        "MercadoPago"
    );

    useEffect(() => {
        if (MercadoPago && totalFilter > 0) {
            const VITE_PUBLIC_KEY_MP = "TEST-a444b3ce-cbb6-4f66-b2d9-4a850880f115";
            const mp = new MercadoPago(VITE_PUBLIC_KEY_MP);

            const cardForm = mp.cardForm({
                amount: "100.5",
                autoMount: true,
                form: formConfig,
                callbacks: {
                    onFormMounted: (error) => {
                        if (error)
                            return console.warn(
                                "Form Mounted handling error: ",
                                error
                            );
                    },
                    onIssuersReceived: (error, issuers) => {
                        console.log("hello", issuers);
                        if (error)
                            return console.warn(
                                "issuers handling error: ",
                                error
                            );
                    },
                    onSubmit: (event) => {
                        event.preventDefault();

                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            // amount,
                            token,
                            installments,
                            identificationNumber,
                            identificationType,
                        } = cardForm.getCardFormData();

                        fetch(
                            `${url}/payment/post`,
                            {
                                // entry point backend
                                method: "POST",
                                body: JSON.stringify({
                                    token,
                                    issuer_id,
                                    payment_method_id,
                                    transaction_amount: 1000,
                                    installments: Number(installments),
                                    description: "Descripción del producto",
                                    payer: {
                                        email,
                                        identification: {
                                            type: identificationType,
                                            number: identificationNumber,
                                        },
                                    },
                                }),
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Request-Method":
                                        "GET, POST, DELETE, PUT, OPTIONS",
                                    "Content-Type": "application/json",
                                },
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => setResultPayment(data))
                            .catch((err) => {
                                setResultPayment(err);
                            });
                    },
                    onFetching: (resource) => {
                        // Animate progress bar
                        const progressBar =
                            document.querySelector(".progress-bar");
                        progressBar.removeAttribute("value");

                        return () => {
                            progressBar.setAttribute("value", "0");
                        };
                    },
                },
            });
        } else {

            console.log("No hay obras")
        }
    }, [MercadoPago]);

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.dataset.name || e.target.name]: e.target.value,
        });
    };

    const handleInputFocus = (e) => {
        setState({ ...state, focus: e.target.dataset.name || e.target.name });
    };



    useEffect(() => {
        if (resultPayment && totalFilter > 0) {
            JSON.stringify(resultPayment);
            const user_id = "user_id";
            const username = "username";
            resultPayment[username] = user[0].username;
            resultPayment[user_id] = user[0].id;
            let products = [];
            let total = 0;
            stateProducts?.products.map((p) => {
                let product = p.id;
                products.push(product);
                total += p.price;
            })
            console.log("products", products)
            console.log("total", total)
            resultPayment["products"] = products;
            resultPayment["total"] = total;
            const paymentFetch = async () => {
                const response = await fetch(
                    `${url}/payment/db/post`,
                    {
                        method: "POST",
                        body: JSON.stringify(resultPayment),
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Request-Method":
                                "GET, POST, DELETE, PUT, OPTIONS",
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                console.log(data);
            };
            paymentFetch();
        } else {
            console.log("No hay obras")
        }
    }, [resultPayment]);







    return (
        <div className="container">
            {/* <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">cvc</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="cvc" />
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">expiry</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="expiry" />
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">name</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name" />
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">number</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="number" />
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">focused</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="focused" />
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">brand</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="brand" />
            </div> */}

            <Card
                cvc={state.cvc}
                expiry={state.cardExpirationMonth + state.cardExpirationYear}
                name={state.cardholderName}
                number={state.cardNumber}
                focused={state.focus}
                brand={state.issuer}
            />

            <form id="form-checkout">
                <div className="form-control">
                    <input
                        type="tel"
                        name="cardNumber"
                        id="form-checkout__cardNumber"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="tel"
                        name="cardExpirationMonth"
                        id="form-checkout__cardExpirationMonth"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="tel"
                        name="cardExpirationYear"
                        id="form-checkout__cardExpirationYear"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="tel"
                        name="cvc"
                        id="form-checkout__securityCode"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        name="cardholderName"
                        id="form-checkout__cardholderName"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="email"
                        name="cardholderEmail"
                        id="form-checkout__cardholderEmail"
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-control">
                    <select
                        name="issuer"
                        id="form-checkout__issuer"
                        on
                    ></select>
                    <select
                        name="identificationType"
                        id="form-checkout__identificationType"
                    ></select>
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        name="identificationNumber"
                        id="form-checkout__identificationNumber"
                    />
                </div>
                <div className="form-control">
                    <select
                        name="installments"
                        id="form-checkout__installments"
                    ></select>
                </div>
                <div className="form-control">
                    <button type="submit" id="form-checkout__submit">
                        Pagar
                    </button>
                </div>
                <progress value="0" className="progress-bar">
                    Cargando...
                </progress>
            </form>
            {resultPayment && <p>{JSON.stringify(resultPayment)}</p>}
        </div>
    );
}

