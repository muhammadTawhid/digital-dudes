import './Appointment.css';
import React from 'react';

const Appointment = () => {
    return (
        <div className="appointment-form-container">
            <h3>Make An Appointment</h3>
            <div className="form-div">
                <input type="text" name="" id="" placeholder="Name" />
                <input type="text" name="" id="" placeholder="Email" />
                <input type="text" name="" id="" placeholder="Phone No." />
                <textarea name="" id="" cols="30" rows="2" placeholder="Write message"></textarea>
            </div>
            <button className="brand-btn">Submit Now</button>
        </div>
    );
};

export default Appointment;