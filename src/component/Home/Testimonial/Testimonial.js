import '../TestimonialCard/TestimonialCard.css';
import '../TestimonialCard/TestimonialCard.css';
import React, { useState, useEffect } from 'react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import axios from "axios";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import Fade from 'react-reveal/Reveal';



const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
    const skeletonData = ["1", "2", "3", "4", "5"];

    useEffect(() => {
        axios.get('https://digital-dudes.herokuapp.com/reviews')
            .then(res => setReviews(res.data))
    }, [])


    return (
        <Fade bottom>
            <div className="mt-2 mb-5 pb-5">
                <h2 className="brand-text text-center testimonial-heading">Clients Feedback</h2>
                <div className="container">
                    <Swiper
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 30
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                        loop={true}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {
                            reviews && reviews.map(data =>
                                <SwiperSlide key={data._id}>
                                    <TestimonialCard data={data} />
                                </SwiperSlide>
                            )
                        }
                        {
                            reviews[0] === undefined &&
                            skeletonData.map(data =>
                                <SwiperSlide key={data}>
                                    <div className="testimonial-card">
                                        <Skeleton width={70} height={70} className="mb-4" />
                                        <Skeleton count={5} />
                                        <Skeleton width={80} height={80} className="mt-4 rounded-circle" />
                                        <Skeleton width={80} height={10} />
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            </div>
        </Fade>
    );
};

export default Testimonial;