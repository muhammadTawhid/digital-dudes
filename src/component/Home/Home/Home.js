import React, { useEffect } from 'react';
import AppointmentAndFaq from '../AppointmentAndFaq/AppointmentAndFaq';
import Header from '../Header/Header';
import Pricing from '../Pricing/Pricing';
import Services from '../Services/Services';
import Team from '../Team/Team';
import Testimonial from '../Testimonial/Testimonial';
import Subscribe from '../Subscribe/Subscribe';
import Footer from '../Footer/Footer';

const Home = () => {

    useEffect(() => {
        document.title = "Home"
    }, []);

    return (
        <div>
            <Header />
            <Services />
            <Pricing />
            <AppointmentAndFaq />
            <Team />
            <Testimonial />
            <Subscribe />
            <Footer />
        </div>
    );
};

export default Home;
