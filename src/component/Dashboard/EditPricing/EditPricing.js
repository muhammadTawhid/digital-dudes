import './EditPricing.css';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useForm } from "react-hook-form";
import axios from 'axios';
import SuccessNotify from '../SuccessNotify/SuccessNotify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EditPricing = () => {
    const { register, handleSubmit } = useForm();
    const [pricing, setPricing] = useState([]);
    const [updatePricing, setUpdatePricing] = useState([]);
    const [successNotify, setSuccessNotify] = useState(false);
    const skeletonData = ["1", "2", "3"];

    useEffect(() => {
        axios.get("https://digital-dudes.herokuapp.com/pricing")
            .then(res => setPricing(res.data))
    }, [])

    const handleUpdatePricing = id => {
        axios.get("https://digital-dudes.herokuapp.com/pricing/" + id)
            .then(res => setUpdatePricing(res.data))
    }

    const onSubmit = data => {
        const { pricingType, pricingValue, service1, service2, service3, service4, service5, service6, service7 } = data;

        const pricingData = {
            pricingTitle: pricingType ? pricingType : updatePricing.pricingTitle,
            pricingValue: pricingValue ? pricingValue : updatePricing.pricingValue,
            services: [
                service1 ? service1 : updatePricing.services[0],
                service2 ? service2 : updatePricing.services[1],
                service3 ? service3 : updatePricing.services[2],
                service4 ? service4 : updatePricing.services[3],
                service5 ? service5 : updatePricing.services[4],
                service6 ? service6 : updatePricing.services[5],
                service7 ? service7 : updatePricing.services[6],
            ],
        }
        //updating pricing
        axios.patch('https://digital-dudes.herokuapp.com/updatePricing/' + updatePricing._id, pricingData)
            .then(res => {
                if (res) {
                    setSuccessNotify(true)
                }
            })
    }

    return (
        <div>
            <div className="row sidebar-row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <h1 className="brand-text text-center">Edit Pricing</h1>
                    <div className="row sidebar-row">
                        {
                            pricing.map(data =>
                                <div key={data._id} className="col-md-4 d-flex justify-content-center">
                                    <button onClick={() => handleUpdatePricing(data._id)} className={`${data.pricingTitle}-pricing pricing-type-btn`}>{data.pricingTitle}</button>
                                </div>
                            )
                        }
                        {pricing[0] === undefined &&
                            skeletonData.map(data =>
                                <div key={data} className="col-md-4 d-flex justify-content-center">
                                    <Skeleton width={180} height={70} />
                                </div>
                            )
                        }
                    </div>
                    <SuccessNotify setSuccessNotify={setSuccessNotify} successNotify={successNotify} />
                    <div className="pricing-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Pricing Type: </label>
                            <input {...register("pricingType")} required type="text" placeholder="ex:basic" defaultValue={updatePricing.pricingTitle} disabled />
                            <br />
                            <label>Pricing Value: </label>
                            <input {...register("pricingValue")} required type="number" placeholder="ex:0" defaultValue={updatePricing.pricingValue} />
                            <br />
                            <label>Service No.1: </label>
                            <input {...register("service1")} required type="text" defaultValue={updatePricing.services?.[0]} />
                            <br />
                            <label>Service No.2: </label>
                            <input {...register("service2")} required type="text" defaultValue={updatePricing.services?.[1]} />
                            <br />
                            <label>Service No.3: </label>
                            <input {...register("service3")} required type="text" defaultValue={updatePricing.services?.[2]} />
                            <br />
                            <label>Service No.4: </label>
                            <input {...register("service4")} required type="text" defaultValue={updatePricing.services?.[3]} />
                            <br />
                            <label>Service No.5: </label>
                            <input {...register("service5")} required type="text" defaultValue={updatePricing.services?.[4]} />
                            <br />
                            <label>Service No.6: </label>
                            <input {...register("service6")} required type="text" defaultValue={updatePricing.services?.[5]} />
                            <br />
                            <label>Service No.7: </label>
                            <input {...register("service7")} required type="text" defaultValue={updatePricing.services?.[6]} />
                            <br />
                            <button type="submit">Update Pricing</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPricing;