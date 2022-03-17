import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import SubscriptedUser from '../SubscriptedUser/SubscriptedUser';
import YourSubscription from '../YourSubscription/YourSubscription';
import { UserContext } from '../../../App';

const Subscription = () => {
    const [loggedInUser] = useContext(UserContext);
    const [yourSubscription, setYourSubscription] = useState([]);
    const [subscriptedUser, setSubscriptedUser] = useState([]);

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
            })
    }, [])


    return (
        <Row className="sidebar-row">
            <Col xs={2} id="sidebar-wrapper">
                <Sidebar />
            </Col>
            <Col xs={10} id="page-content-wrapper" className="container">
                <h2 className="brand-text text-center">{loggedInUser.admin ? <span>You have {subscriptedUser.length} subscripted users</span> : yourSubscription ? "Your Subscription" : <span>Hello, {loggedInUser.name}<br />You have no subscription yet :(</span>}</h2>
                <div >
                    {loggedInUser.admin ? <SubscriptedUser subscriptedUser={subscriptedUser} />
                        :
                        <YourSubscription yourSubscription={yourSubscription} setYourSubscription={setYourSubscription} />}
                </div>
            </Col>
        </Row>
    );
};

export default Subscription;