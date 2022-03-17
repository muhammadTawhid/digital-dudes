import './Payment.css';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmazonPay } from '@fortawesome/free-brands-svg-icons'
import { faLock, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51KUf9fENSw6iH46SAzaKMTRaoApcdUBl7htaUvQMftdIGcUd1F5rRDZwX7T6ZWCMiWLONqbB7RBFOfUjkbw9ny0Z00BIIPs288');

const Payment = () => {
    const [paymentForm, setPaymentForm] = useState(false);
    const [pricing, setPricing] = useState([])
    const { pricingId } = useParams();

    useEffect(() => {
        axios.get("https://digital-dudes.herokuapp.com/pricing/" + pricingId)
            .then(res => setPricing(res.data))
    }, [])

    return (
        <div className="payment-container">
            <div>
                <HeaderNavbar />
                {paymentForm ? <div className="payment-form">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm pricing={pricing} />
                    </Elements>
                </div>
                    :
                    <div className="payment-header">
                        <FontAwesomeIcon className="lock-icon" icon={faLock} />
                        <h1>Set up your payment</h1>
                        <p>Your membership starts as soon as you set up payment.</p>
                        <h6>No commitments. <br />Cancel subscription anytime.</h6>
                        <button onClick={() => setPaymentForm(true)}>Credit or Debit Card <FontAwesomeIcon icon={faCcVisa} /><FontAwesomeIcon icon={faCcMastercard} /><FontAwesomeIcon icon={faCcAmazonPay} /><FontAwesomeIcon className="angle-icon" icon={faAngleRight} /></button>
                    </div>
                }
                <Footer />
            </div>
        </div>
    );
};

export default Payment;