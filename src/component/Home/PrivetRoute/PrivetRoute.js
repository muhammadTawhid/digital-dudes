import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import Login from '../Login/Login';

const PrivetRoute = ({ children, ...rest }) => {
    const [loggedInUser] = useContext(UserContext)

    return (
        loggedInUser.email ? children : <Login to="/login" />
    );
};

export default PrivetRoute;