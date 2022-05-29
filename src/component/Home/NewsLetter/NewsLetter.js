import './NewsLetter.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faGrinAlt } from '@fortawesome/free-solid-svg-icons'
import Bounce from 'react-reveal/Reveal';

const NewsLetter = () => {
    const [subscriptedLetter, setSubscriptedLetter] = useState(false);

    const handleEmailSubmit = e => {
        e.preventDefault();
        setSubscriptedLetter(true);
    }

    return (
        <Bounce left>
            <div className="newsLetter-panel  d-flex align-items-center">
                {subscriptedLetter ?
                    <div className="container">
                        <h1 className="brand-text text-white mb-5">Thanks for subscribing to our newsletter.</h1> <FontAwesomeIcon icon={faGrinAlt} />
                    </div>
                    :

                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 col-xl-7 col-lg-6">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </div>
                                <div>
                                    <h2>Subscribe for Newsletter</h2>
                                    <p>Manage Your Business With Our Technology</p>
                                </div>

                            </div>
                            <div className="col-md-6 col-xl-5 col-lg-6">
                                <form onSubmit={handleEmailSubmit}>
                                    <input type="email" name="" id="" placeholder="Email Address..." required />
                                    <button type="submit">Subscribe Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Bounce>
    );
};

export default NewsLetter;