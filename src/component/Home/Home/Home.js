import React, { useEffect } from 'react';
import AppointmentAndFaq from '../AppointmentAndFaq/AppointmentAndFaq';
import Header from '../Header/Header';
import Pricing from '../Pricing/Pricing';
import Services from '../Services/Services';
import Team from '../Team/Team';
import Testimonial from '../Testimonial/Testimonial';
import NewsLetter from '../NewsLetter/NewsLetter';
import Footer from '../Footer/Footer';

const Home = () => {

    useEffect(() => {
        document.title = "Home"
    }, []);

    return (
        <>
            <Header />
            <Services />
            <Pricing />
            <AppointmentAndFaq />
            <Team />
            <Testimonial />
            <NewsLetter />
            <Footer />
        </>
    );
};

export default Home;
