import './Subscription.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import warningSad from '../../../images/warning-sad.png';
import Sidebar from '../Sidebar/Sidebar';
import SubscriptedUser from '../SubscriptedUser/SubscriptedUser';
import YourSubscription from '../YourSubscription/YourSubscription';
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';

const Subscription = () => {
    const [loggedInUser] = useContext(UserContext);
    const [yourSubscription, setYourSubscription] = useState([]);
    const [subscriptedUser, setSubscriptedUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("https://digital-dudes.onrender.com/subscriptedUser")
            .then(res => {
                setSubscriptedUser(res.data)
            })
    }, [])

    useEffect(() => {
        axios.get("https://digital-dudes.onrender.com/subscriptedUser/" + loggedInUser.email, {
            headers: {
                authorization: localStorage.getItem("loggedInUserToken")
            }
        })
            .then(res => {
                setYourSubscription(res.data)
                setIsLoading(false)
            })
    }, [])


    return (
        <div className="row sidebar-row">
            <div className="col-md-2 col-lg-2">
                <Sidebar />
            </div>
            <div className="col-lg-10 container subscription-div">
                <div>

                    {
                        !isLoading &&
                        (loggedInUser.admin ?
                            <h2 style={{ position: "static" }} className="brand-text text-center">Subscripted Users </h2>
                            :
                            yourSubscription._id ? <h2 className="brand-text text-center">Your Subscription</h2>
                                :
                                yourSubscription.length === 0 &&
                                <div className="text-center" id="noSubscription-div">
                                    <h2 className="brand-text text-center">Hello, {loggedInUser.name}</h2>
                                    <h3>You have no subscription !</h3>
                                    <img className="text-center" src={warningSad} alt="" />
                                    <p><Link to="/">Back to home</Link> and see our pricing plan</p>
                                </div>)
                    }
                </div>
                <div>
                    {loggedInUser.admin ? <SubscriptedUser subscriptedUser={subscriptedUser} />
                        :
                        yourSubscription && <YourSubscription yourSubscription={yourSubscription} setYourSubscription={setYourSubscription} isLoading={isLoading} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Subscription;