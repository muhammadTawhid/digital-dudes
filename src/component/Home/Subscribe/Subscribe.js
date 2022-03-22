import './Subscribe.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faGrinAlt } from '@fortawesome/free-solid-svg-icons'
import Bounce from 'react-reveal/Reveal';

const Subscribe = () => {
    const [subscriptedLetter, setSubscriptedLetter] = useState(false);

    const handleEmailSubmit = e => {
        e.preventDefault();
        setSubscriptedLetter(true);
    }
    return (
        <Bounce left>
            <div className="subscribe-panel  d-flex align-items-center">
                {subscriptedLetter ?
                    <div>
                        <h1 className="brand-text text-white mb-5">Thanks for subscribing to our newsletter.</h1> <FontAwesomeIcon icon={faGrinAlt} />
                    </div>
                    :

                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-xl-7 col-md-6 col-lg-6">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </div>
                                <div>
                                    <h2>Subscribe for Newsletter</h2>
                                    <p>Manage Your Business With Our Technology</p>
                                </div>

                            </div>
                            <div class="col-md-6 col-xl-5 col-lg-6">
                                <form onSubmit={handleEmailSubmit}>
                                    <input type="email" name="" id="" placeholder="Email Address..." required />
                                    <button type="submit">Subscribe Now</button>
                                </form>
                            </div>
                        </div>

                    </div>
                    // <div className="row">
                    //     <div className="col-xl-7 col-lg-7">
                    //         <div className="text">
                    //             <h2>Subscribe for Newsletter</h2>
                    //             <p>Manage Your Business With Us</p>
                    //             <FontAwesomeIcon icon={faPaperPlane} />
                    //         </div>
                    //     </div>
                    //     <div className="col-xl-5 col-lg-5">
                    //         <form onSubmit={handleEmailSubmit}>
                    //             <input type="email" name="" id="" placeholder="Email Address..." required />
                    //             <button type="submit">Subscribe Now</button>
                    //         </form>
                    //     </div>
                    // </div>
                }
            </div>
        </Bounce>
    );
};

export default Subscribe;