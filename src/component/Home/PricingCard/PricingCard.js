import './PricingCard.css';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const PricingCard = (props) => {

    const { _id, pricingTitle, pricingValue, services } = props.data;

    return (
        <div className="col-md-4 pricing-card">
            <h4>{pricingTitle}</h4>
            <h2><span className="span-text">${pricingValue}</span><strong> / Monthly</strong></h2>
            <div>
                {
                    services && services.map(service =>
                        <div key={service}><p><FontAwesomeIcon icon={faCheck} /> {service}</p>
                        </div>
                    )
                }
            </div>
            <Link to={`payment/${_id}`}>
                <button className="brand-btn">Choose Now</button>
            </Link>
        </div>
    );
};

export default PricingCard;