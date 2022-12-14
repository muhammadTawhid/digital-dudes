import './Service.css';
import React, { useState, useEffect } from 'react';
import { Link as LinkScroll } from "react-scroll";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import Fade from 'react-reveal/Reveal';


const Services = () => {
    const [serviceData, setServiceData] = useState([])
    const skeletonData = ["1", "2", "3", "4", "5", "6"];

    useEffect(() => {
        axios.get('https://digital-dudes.onrender.com/services')
            .then(res => setServiceData(res.data))
    }, [serviceData])



    return (
        <Fade bottom>
            <section id="services" className="container mt-5 mb-3 py-5">
                <div className=" row d-flex justify-content-around ">
                    <div className="col-lg-6 col-md-12 service-header">
                        <h2 className="brand-text">We Make Your Business Bright</h2>
                        <p>We had such a strong focus on delivering top-quality customer services. Our company has high profiled designers, developer and experts over the 5 years+ experiences of those technologies.</p>
                    </div>
                    {
                        serviceData && serviceData.map(data =>
                            <div key={data._id} className="col-lg-3 col-md-6 border service-card">
                                <img src={data.serviceThumbnail} alt="" />
                                <h4>{data.serviceName}</h4>
                                <p>{data.serviceDescription}</p>
                                <LinkScroll to="pricing" spy={true} smooth={true} duration={800}><button>learn more </button></LinkScroll>
                            </div>
                        )
                    }
                    {serviceData[0] === undefined &&
                        skeletonData?.map(data =>
                            <div key={data} className="col-lg-3 col-md-6 border service-card">
                                <Skeleton className="rounded-circle" width={85} height={85} />
                                <Skeleton className="mb-4 mt-3" height={30} />
                                <Skeleton count={4} />
                                <Skeleton className="mt-4" width={80} height={20} />
                            </div>
                        )
                    }
                </div>
            </section>
        </Fade>
    );
};

export default Services;