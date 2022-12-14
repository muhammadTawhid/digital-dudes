import './CheckoutForm.css';
import React, { useState, useContext, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { UserContext } from '../../../App.js';
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ pricing }) => {
    const navigate = useNavigate();
    const [loggedInUser] = useContext(UserContext);
    const [yourSubscription, setYourSubscription] = useState([]);
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const pricingValue = parseInt(pricing.pricingValue);

    const handleSetCountry = e => {
        setCountry(e.target.value)
    }

    useEffect(() => {
        if (pricingValue) {
            axios.post("https://digital-dudes.onrender.com/create-payment-intent", { pricingValue })
                .then(res => setClientSecret(res.data?.clientSecret))
        }
    }, [pricingValue])

    useEffect(() => {
        axios.get("https://digital-dudes.onrender.com/subscriptedUser/" + loggedInUser.email, {
            headers: {
                authorization: localStorage.getItem("loggedInUserToken")
            }
        })
            .then(res => {
                setYourSubscription(res.data)
            })
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card, });

        if (error) {
            setError(error.message);
        }
        else {
            setProcessing(true)
        }

        //payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: '',
                        email: '',
                    },
                },
            },
        );

        if (intentError) {
            console.log(intentError, "err initent");
        }
        else {
            if (paymentIntent) {
                const paymentDetails = {
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    country: country,
                    paymentDate: new Date().toISOString().substring(0, 10),
                    paymentFor: pricing.pricingTitle,
                    payedIn: paymentIntent.currency,
                    amount: paymentIntent.amount,
                    cardNumber: paymentMethod.card?.last4,
                    transactionId: paymentIntent.id.split("pi_")[1],
                }
                if (yourSubscription._id) {
                    axios.put("https://digital-dudes.onrender.com/subscriptedUserNewPlan/" + yourSubscription._id, paymentDetails)
                        .then(res => {
                            if (res) {
                                navigate("/dashboard/subscription");
                            }
                        })
                }
                else {
                    axios.post("https://digital-dudes.onrender.com/addSubscriptedUser", paymentDetails)
                        .then(res => {
                            if (res) {
                                navigate("/dashboard/subscription");
                            }
                        })
                }
            }
        }
    }

    return (
        <div className="payment-form-container">
            <h1>Complete Your Payment</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input onChange={handleSetCountry} type="text" placeholder="Country" />
                <CardElement
                    className="form-control"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {error && <small className="text-danger">{error}</small>}
                <button className={processing ? "disabled btn btn-success" : "btn btn-success"} type="submit" disabled={!stripe}>
                    {
                        processing ?
                            <span><Spinner
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />Processing...</span>
                            :
                            <span>Pay ${pricingValue} and Start Membership</span>}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;