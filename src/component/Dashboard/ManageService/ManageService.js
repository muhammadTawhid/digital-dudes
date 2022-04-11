import './ManageService.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import WarningModal from '../WarningModal/WarningModal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';


const ManageService = () => {
    const [serviceData, setServiceData] = useState([]);
    const [serviceDeleteId, setServiceDeleteId] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const skeletonData = ["1", "2", "3", "4", "5", "6"];

    useEffect(() => {
        axios.get('https://digital-dudes.herokuapp.com/services')
            .then(res => setServiceData(res.data))
    }, [])


    const onHide = () => {
        setModalShow(false)
        setServiceDeleteId(null)
    }

    const handleSetServiceId = id => {
        setServiceDeleteId(id);
        setModalShow(true)
    }

    return (
        <div className="row sidebar-row">
            <div className="col-md-2">
                <Sidebar />
            </div>
            <div className="col-md-10 manageService-div">
                <h1 className="brand-text text-center mt-2">Manage your services</h1>
                <div className="row d-flex justify-content-evenly mt-4">
                    <WarningModal show={modalShow} onHide={onHide} serviceDeleteId={serviceDeleteId} setServiceData={setServiceData} />
                    {serviceData.map(data =>
                        <div key={data._id} className="col-md-6 d-flex manageService-card">
                            <img src={data.serviceThumbnail} alt="" />
                            <div>
                                <h4>{data.serviceName}</h4>
                                <p>{data.serviceDescription}</p>
                                <div className="btn-div">
                                    <Link to={`/dashboard/service/editService/${data._id}`} >
                                        <button className="me-5"><FontAwesomeIcon icon={faEdit} /></button>
                                    </Link>
                                    <button onClick={() => handleSetServiceId(data._id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            </div>
                        </div>
                    )}

                    {serviceData[0] === undefined &&
                        skeletonData.map(data =>
                            <div key={data} className="col-md-6 d-flex manageService-card">
                                <Skeleton height={90} width={80} />
                                <div>
                                    <Skeleton count={4} />
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageService;
