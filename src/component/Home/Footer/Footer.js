import './Footer.css';
import React from 'react';
import Fade from 'react-reveal/Reveal';
import { Link as LinkScroll } from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faSnapchatGhost, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <Fade >
            <footer className="text-center text-lg-start text-muted">
                <section className="footer-main-section">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h4>
                                    Our Company
                                </h4>
                                <p>
                                    We have ~130 full-time employees, manage $100M+ in annual spend, optimize thousands of web pages, send thousands of emails/texts/chats and analyze hundreds of thousands of data points each year.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h4>
                                    Links
                                </h4>
                                <p>
                                    <LinkScroll to="home" spy={true} smooth={true} duration={800} className="text-reset">Home</LinkScroll>
                                </p>
                                <p>
                                    <LinkScroll to="aboutUs" spy={true} smooth={true} duration={800} className="text-reset">About Us</LinkScroll>
                                </p>
                                <p>
                                    <LinkScroll to="services" offset={20} spy={true} smooth={true} duration={800} className="text-reset">Services</LinkScroll>
                                </p>
                                <p>
                                    <LinkScroll to="pricing" spy={true} smooth={true} duration={800} className="text-reset">Pricing</LinkScroll>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h4>
                                    Help
                                </h4>
                                <p>
                                    <LinkScroll to="aboutUs" spy={true} smooth={true} duration={800} className="text-reset">FAQ</LinkScroll>
                                </p>
                                <p>
                                    <LinkScroll to="aboutUs" spy={true} smooth={true} duration={800} className="text-reset">Support</LinkScroll>
                                </p>
                                <p>
                                    <a href="/" className="text-reset">Privacy</a>
                                </p>
                                <p>
                                    <a href="/" className="text-reset">Terms & Conditions</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h4>
                                    Contact Us
                                </h4>

                                <p> <FontAwesomeIcon icon={faPhoneAlt} /> + 88 258 361 88</p>
                                <p><FontAwesomeIcon icon={faEnvelope} /> official@digitaldudes.com</p>
                                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Texus, TX 10012, US</p>
                            </div>
                        </div>
                    </div>
                </section>



                <section
                    className="d-flex justify-content-center justify-content-lg-between border-bottom footer-bottom-section"
                >
                    <div className="text-center">
                        © {(new Date().getFullYear())} Copyright:
                        <a className="text-reset fw-bold" href="https://digital-dudes.web.app/"> DigitalDudes.com</a>
                    </div>

                    <div>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://web.facebook.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="https://www.pinterest.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faPinterest} /></a>
                        <a href="https://www.snapchat.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faSnapchatGhost} /></a>
                    </div>
                </section>
            </footer>
        </Fade>
    );
};

export default Footer;