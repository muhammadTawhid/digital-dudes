import '../PricingCard/PricingCard.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PricingCard from '../PricingCard/PricingCard';
import Skeleton from 'react-loading-skeleton';
import Fade from 'react-reveal/Reveal';


const Pricing = () => {
    const [pricing, setPricing] = useState([]);
    const skeletonData = ["1", "2", "3"];


    useEffect(() => {
        axios.get("https://digital-dudes.herokuapp.com/pricing")
            .then(res => setPricing(res.data))
    }, [])
    return (
        <Fade bottom>
            <section id="pricing">
                <h2 className="brand-text text-center pricing-title">Flexible Pricing Plane</h2>
                <div className="container">
                    <div className="row d-flex justify-content-evenly">
                        {
                            pricing && pricing.map(data => <PricingCard data={data} key={data._id} />)
                        }
                        {
                            pricing[0] === undefined &&
                            skeletonData.map(data =>
                                <div className="pricing-card">
                                    <Skeleton width={130} height={25} />
                                    <Skeleton width={200} height={40} className="my-3" />
                                    <Skeleton width={180} height={20} count={7} className="my-2" />
                                    <Skeleton width={150} height={40} className="mt-4 rounded-pill" />
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </Fade>
    );
};

export default Pricing;