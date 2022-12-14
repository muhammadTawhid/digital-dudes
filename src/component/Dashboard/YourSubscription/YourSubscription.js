import './YourSubscription.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmazonPay } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const YourSubscription = ({ yourSubscription, setYourSubscription, isLoading }) => {
    const todaysDate = new Date(new Date().toISOString().substring(0, 10));
    const daysLeft = Math.ceil(Math.abs(new Date(yourSubscription.paymentDate) - todaysDate) / (1000 * 60 * 60 * 24));
    const remainingDays = 30 - daysLeft;

    const handleDeletePlan = id => {
        axios.delete('https://digital-dudes.onrender.com/deleteSubscription/' + id)
            .then(res => {
                if (res) {
                    setYourSubscription("")
                }
            })
    }

    return (
        <div>
            {isLoading ?
                <div className="yourSubscription-div" id="yourSubscription-skeleton-div" style={{marginTop:"6em"}}>
                    <Skeleton className="subscriptionDetail-skeleton-h2" width={300} height={40} />
                    <p><Skeleton className="subscriptionDetail-skeleton-p" width={600} height={20} /></p>
                    <div className="subscriptionDetail-div subscriptionDetail-skeleton-div">
                        <div className="row d-flex justify-content-between">
                            <div className="col-md-6">
                                <h3><Skeleton width={150} height={40} /></h3>
                                <p><Skeleton width={200} count={2} /></p>
                            </div>
                            <div className="col-md-6 text-end">
                                <Skeleton width={140} height={50} />
                            </div>
                        </div>
                        <hr />
                        <div className="row d-flex align-items-center">
                            <div className="col-md-6">
                                <Skeleton width={150} />
                                <div className="d-flex">
                                    <Skeleton width={40} height={30} />
                                    <Skeleton className="mx-2" width={40} height={30} />
                                    <Skeleton width={40} height={30} />
                                </div>

                            </div>
                            <div className="col-md-6 text-end">
                                <Skeleton width={140} height={50} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="yourSubscription-div">
                    <h2>Plan &  Payment</h2>
                    <p>Select the plan that's best for you. You can cancel your subscription at any time</p>
                    <div className="subscriptionDetail-div">
                        <div className="row d-flex justify-content-between">
                            <div className="col-md-6">
                                <h3>{yourSubscription.paymentFor}</h3>
                                <p>${yourSubscription.amount}/month <span>Billed monthly</span></p>
                                <p><span>{daysLeft <= 30 ? remainingDays + " days remaining" : <small className="text-danger">Subscription Disabled</small>}</span></p>
                            </div>
                            <div className="col-md-6 text-end">
                                <Link to="/">
                                    <button>Change Plan</button>
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <div className="row d-flex align-items-center">
                            <div className="col-md-6">
                                <p><span>PAYMENT METHOD</span></p><FontAwesomeIcon icon={faCcVisa} /><FontAwesomeIcon icon={faCcMastercard} /><FontAwesomeIcon icon={faCcAmazonPay} />
                            </div>
                            <div className="col-md-6 text-end">
                                <button onClick={() => handleDeletePlan(yourSubscription._id)}>Cancel Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default YourSubscription;