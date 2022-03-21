import './Faq.css';
import React from 'react';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Faq = () => {
    return (
        <div className="faq-div">
            <h2 className="brand-text text-center">Get Your Answer</h2>
            <Collapsible trigger={["Why choose us", <FontAwesomeIcon icon={faAngleDown} />]} className="panel-header" >
                <p>
                    Our team is made up of award-winning marketers, designers, and developers, and we know what it takes to get real results online. We also keep the focus on the metrics that mean the most, like leads and revenue generated.
                </p>
            </Collapsible>
            <Collapsible trigger={["What our passion", <FontAwesomeIcon icon={faAngleDown} />]} className="panel-header" >
                <p>
                    The agency is our passion, and we're passionate about helping businesses reach their goals. So when you choose Digital Dudes as your digital agency, you won't get a cookie-cutter strategy — you'll get a custom plan that fits your company, your needs, and your goals.
                </p>
            </Collapsible>
            <Collapsible trigger={["We help you grow", <FontAwesomeIcon icon={faAngleDown} />]} className="panel-header" >
                <p>
                    At Disruptive, we're passionate about building lifelong relationships with a foundation that starts with your business and marketing results. Any worthwhile relationship requires work from both parties to be successful.
                </p>
            </Collapsible>
            <Collapsible trigger={["About our experiences", <FontAwesomeIcon icon={faAngleDown} />]} className="panel-header" >
                <p>
                    Through our years of experience, we’ve also learned that while each channel has its own set of advantages, they all work best when strategically paired with other channels. That’s why we offer full-service strategies to each of our clients, and use a combination of digital channels to increase visibility, conversions, and revenue.

                </p>
            </Collapsible>
            <Collapsible trigger={["Why we provide the best service", <FontAwesomeIcon icon={faAngleDown} />]} className="panel-header" >
                <p>
                    We are growth partners who care about you and your business. We partner with our clients to understand the why behind your business, the goals you aspire to and impact this will have on your customers and business.
                </p>
            </Collapsible>
        </div>
    );
};

export default Faq;