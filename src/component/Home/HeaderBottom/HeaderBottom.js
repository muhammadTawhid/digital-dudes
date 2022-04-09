import './HeaderBottom.css';
import React from 'react';
import teamWork from '../../../images/teamWork.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const HeaderBottom = () => {
    return (
        <div className="header-bottom-container">
            <h2 className="text-center">We provide services all over the world</h2>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <h1 className="text-center">40</h1>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="main-content ">
                            <h4>Offices in different countries</h4>
                            <p className="main-content-p">When interacting with customers- we strive to make sure that we present an experience ensuring their satisfaction. Our goal is to keep the customers happy and regularly coming back.</p>
                            <div className="row d-flex align-items-center">
                                <div className="col-md-4">
                                    <img src={teamWork} alt="" />
                                </div>
                                <div className="col-md-8 mt-3">
                                    <p><FontAwesomeIcon className="icon" icon={faCheck} /> Delivering top-quality services.</p>
                                    <p><FontAwesomeIcon className="icon" icon={faCheck} /> 24 hours project help support.</p>
                                    <p><FontAwesomeIcon className="icon" icon={faCheck} /> Easy & trouble free handy deal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderBottom;
