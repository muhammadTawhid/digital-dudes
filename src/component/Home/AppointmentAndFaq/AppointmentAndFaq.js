import React from 'react';
import Appointment from '../Appointment/Appointment';
import Faq from '../Faq/Faq';
import Fade from 'react-reveal/Reveal';

const AppointmentAndFaq = () => {
    return (
        <Fade bottom>
            <div id="aboutUs" className="container my-5 py-5">
                <div className="row">
                    <div className="col-md-6">
                        <Appointment />
                    </div>
                    <div className="col-md-6">
                        <Faq />
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default AppointmentAndFaq;