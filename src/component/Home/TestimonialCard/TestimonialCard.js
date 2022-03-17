import './TestimonialCard.css';
import React from 'react';
import quote from '../../../images/quotation.png';

const TestimonialCard = (props) => {
    const { clientImg, clientName, clientMessage } = props.data;

    return (
        <div className="testimonial-card">
            <img src={quote} alt="" />
            <p className="d-flex">{clientMessage}</p>
            <img className="client-img" src={clientImg} alt="" />
            <h5>{clientName}</h5>
        </div>
    );
};

export default TestimonialCard;