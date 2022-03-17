import './HeaderMain.css';
import React from 'react';
import { Link as LinkScroll } from "react-scroll";
import TextAnimation from "react-animate-text";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faSnapchat, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons'

const HeaderMain = () => {
    return (
        <div className="headerMain-container container">
            <div className="row">
                <div className="col-md-8 col-lg-8">
                    <h1>
                        We Are <TextAnimation><span>Digital Dudes</span></TextAnimation><br />Digital Agency</h1>
                    <p>We are here to grow your business. We have world class designer, developer & seo expert. So we can be the best fit for your project.</p>
                    <LinkScroll to="services" offset={20} spy={true} smooth={true} duration={800}>
                        <button className="brand-btn">See our services</button>
                    </LinkScroll>
                </div>
                <div className="col-md-4 col-lg-4 mt-3">
                    <a href="https://web.facebook.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="https://www.pinterest.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faPinterest} /></a>
                    <a href="https://twitter.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="https://www.snapchat.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faSnapchat} /></a>
                </div>
            </div>
        </div>
    );
};

export default HeaderMain;