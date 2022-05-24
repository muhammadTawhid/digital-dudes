import './Subscription.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import warningSad from '../../../images/warning-sad.png';
import Sidebar from '../Sidebar/Sidebar';
import SubscriptedUser from '../SubscriptedUser/SubscriptedUser';
import YourSubscription from '../YourSubscription/YourSubscription';
import { UserContext } from '../../../App';

const Subscription = () => {
    const [loggedInUser] = useContext(UserContext);
    const [yourSubscription, setYourSubscription] = useState([]);
    const [subscriptedUser, setSubscriptedUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log(yourSubscription)
    useEffect(() => {
        axios.get("https://digital-dudes.herokuapp.com/subscriptedUser")
            .then(res => {
                setSubscriptedUser(res.data)
            })
    }, [])

    useEffect(() => {
        axios.get("https://digital-dudes.herokuapp.com/subscriptedUser/" + loggedInUser.email, {
            headers: { authorization: sessionStorage.getItem("loggedInUserToken") }
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
                {/* <h2 className="brand-text text-center">{loggedInUser.admin ? <span>You have {subscriptedUser.length} subscripted users</span> : yourSubscription ? "Your Subscription" : <span>Hello, {loggedInUser.name}<br />You have no subscription yet :(</span>}</h2> */}
                <div>

                    {
                        !isLoading &&
                        (loggedInUser.admin ?
                            <h2 style={{position:"static"}} className="brand-text text-center">Subscripted Users </h2>
                            :
                            yourSubscription._id ? <h2 className="brand-text text-center">Your Subscription</h2>
                                :
                                yourSubscription.length === 0 &&
                                <div className="text-center" id="noSubscription-div">
                                    <h2 className="brand-text text-center">Hello, {loggedInUser.name}</h2>
                                    <h3>You have no subscription !</h3>
                                    <img className="text-center" src={warningSad} alt="" />
                                </div>)
                    }
                </div>
                <div>
                    {loggedInUser.admin ? <SubscriptedUser subscriptedUser={subscriptedUser} />
                        :
                        yourSubscription && <YourSubscription yourSubscription={yourSubscription} setYourSubscription={setYourSubscription} isLoading={isLoading}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default Subscription;