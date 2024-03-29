import './ActionPageForm.css';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import addImg from '../../../images/sideImg1.jpg';
import editImg from '../../../images/sideImg2.jpg';
import SuccessNotify from '../SuccessNotify/SuccessNotify';
import { useNavigate, useParams } from 'react-router-dom';


const ActionPageForm = ({ addReview, setAddReview }) => {
    const [characters, setCharacters] = useState(null);
    const [successNotify, setSuccessNotify] = useState(false);
    const [imgUploading, setImgUploading] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [updatedService, setUpdatedService] = useState([])

    const { register, handleSubmit, trigger, formState: { errors } } = useForm();
    const { serviceUpdateId } = useParams();
    const history = useNavigate();

    //counting character on text area
    const handleCountCharacter = e => {
        const inputValue = e.target.value.split('');
        setCharacters(inputValue.length);
    }

    //getting updating service by id
    useEffect(() => {
        setUpdatedService([]);
        if (serviceUpdateId) {
            axios.get('https://digital-dudes.onrender.com/serviceById/' + serviceUpdateId)
                .then(res => setUpdatedService(res.data))
        }
    }, [serviceUpdateId])

    // getting acton img hosted url
    const uploadImg = e => {
        const newImgData = new FormData();
        newImgData.set("key", "be8a4cc0a70c10d0afc35bcd7b9def3d")
        newImgData.append("image", e.target.files[0])
        setImgUploading(true)
        axios.post('https://api.imgbb.com/1/upload', newImgData)
            .then(function (response) {
                console.log(response.data.data.display_url, "success");
                setImgUrl(response.data.data.display_url);
                setImgUploading(false) 
            })
            .catch(function (error) {
                console.log(error, "img up err");
            });
    }

    const onSubmit = data => {
        const newService = {
            serviceName: data.name,
            serviceDescription: data.description,
            serviceThumbnail: imgUrl ? imgUrl : updatedService.serviceThumbnail,
        }

        const newReview = {
            clientImg: imgUrl ? imgUrl : "https://i.ibb.co/WKjYBgg/user-Avatar.png",
            clientName: data.name,
            clientMessage: data.description,
        }

        //adding service
        if (serviceUpdateId === undefined && addReview === undefined) {
            axios.post('https://digital-dudes.onrender.com/addService', newService)
                .then(function (response) {
                    if (response) {
                        setSuccessNotify(true)
                        history("/dashboard/manageService")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        //updating service
        if (serviceUpdateId) {
            axios.patch('https://digital-dudes.onrender.com/updateService/' + serviceUpdateId, newService)
                .then(function (response) {
                    if (response) {
                        setSuccessNotify(true)
                        history("/dashboard/manageService")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        //add review
        if (addReview) {
            axios.post('https://digital-dudes.onrender.com/addReview', newReview)
                .then(function (response) {
                    if (response) {
                        axios.get('https://digital-dudes.onrender.com/reviews')
                            .then(res => setAddReview(res.data))
                        setSuccessNotify(true)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }



    return (

        <div className="row sidebar-row ">
            {addReview ? "" : <div className="col-md-2 sidebar-col">
                <Sidebar />
            </div>}
            <div className={addReview ? "col-md-10 actionPageForm-div addReview-active pb-4" : "col-md-10 actionPageForm-div pb-4"}>
                <h2 className="brand-text text-center">{addReview ? "Add Review" : serviceUpdateId ? "Edit Service" : "Add Service"}</h2>
                <SuccessNotify setSuccessNotify={setSuccessNotify} successNotify={successNotify} />
                <div className="form-container d-flex">
                    <div>
                        <img src={serviceUpdateId ? editImg : addImg} alt="" />
                    </div>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>{addReview ? "Your Name" : "Service Name"}</label>
                                        <br />
                                        <input
                                            {...register("name", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^[A-Z]/,
                                                    message: "First letter should be uppercase",
                                                },
                                            })}
                                            onKeyUp={() => trigger("name")}
                                            type="text"
                                            placeholder="Enter Name"
                                            required="required"
                                            defaultValue={serviceUpdateId ? updatedService.serviceName : ""}
                                        />
                                        <br />
                                        {errors.name && <small className="text-danger">{errors.name?.message}</small>}
                                        <div>
                                            <h6>{addReview ? "Your Image (optional)" : "Add Service Thumbnail"}</h6>
                                            <label id="upload-thumbnail-btn" htmlFor="thumbnail-upload">
                                                {
                                                    imgUploading ? <span><Spinner
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />Uploading...</span> : <span>
                                                        <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                                                        Upload Photo
                                                    </span>}

                                            </label>
                                            <input
                                                onChange={uploadImg}
                                                hidden
                                                id="thumbnail-upload"
                                                type="file"
                                                placeholder="Upload service thumbnail"

                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="textarea-label">{addReview ? "Your Review" : "Service Description"}</label><small> ({characters ? characters : 0}/250)</small>
                                        <textarea
                                            defaultValue={serviceUpdateId ? updatedService.serviceDescription : ""}
                                            onKeyUp={() => trigger("description")}
                                            onKeyUpCapture={handleCountCharacter}
                                            {...register("description", {
                                                required: "This field is required",
                                                maxLength: {
                                                    value: 250,
                                                    message: "It's Contains only 250 characters"
                                                }
                                            })} cols="40" rows="5" placeholder="Write your description here..."></textarea>
                                        <br />
                                        {errors.description && <small className="text-danger">{errors.description?.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center"><button id="add-service-btn" type="submit">{addReview ? "Add Review" : serviceUpdateId ? "Update Service" : "Add Service"}</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionPageForm;

