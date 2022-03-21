import React from 'react';
import Appointment from '../Appointment/Appointment';
import Faq from '../Faq/Faq';
import Fade from 'react-reveal/Reveal';

const AppointmentAndFaq = () => {
    return (
        <Fade bottom>
            <div id="aboutUs" className="container my-5 py-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 col-md-12 ">
                        <Appointment />
                    </div>
                    <div className="col-sm-12 col-lg-6 col-md-12">
                        <Faq />
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default AppointmentAndFaq;