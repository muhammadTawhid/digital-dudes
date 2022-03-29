import './NotFound.css';
import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
    return (
        <div className="notFound-container">
            <h1>404</h1>
            <h2>Oops! Nothing was found</h2>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.  <br />  <Link to="/">Return to homepage</Link></p>
        </div>
    );
};

export default NotFound;