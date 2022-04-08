import './AddAdmin.css';
import React from 'react';
import XMLParser from 'react-xml-parser';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';

const AddAdmin = ({ setAdmins }) => {
    const [pending, setPending] = useState(false)
    const { register, handleSubmit, trigger, formState: { errors } } = useForm();
    const onSubmit = data => {
        if (data) {
            setPending(true)
            const url = `https://www.avatarapi.com/avatar.asmx/GetProfile?email=${data.adminEmail}&username=sanjid&password=Tawhid2022`

            axios.get(url, { "Content-Type": "application/xml; charset=utf-8" })
                .then(res => {
                    const jsonDataFromXml = new XMLParser().parseFromString(res.data);
                    const adminImgUrl = jsonDataFromXml.children[1].value;

                    if (adminImgUrl || adminImgUrl !== true) {
                        const newAdmin = {
                            adminName: data.adminName,
                            adminEmail: data.adminEmail,
                            adminImg: adminImgUrl ? adminImgUrl : "https://i.ibb.co/WKjYBgg/user-Avatar.png",
                            adminType: "Subordinary",
                        }
                        axios.post('https://digital-dudes.herokuapp.com/addAdmin', newAdmin)
                            .then(function (response) {
                                if (response) {
                                    axios.get('https://digital-dudes.herokuapp.com/admins')
                                        .then(res => setAdmins(res.data))
                                    setPending(false)
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                });
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            <div id="addAdmin-row-div" className="row sidebar-row">
                <div className="col-md-5 addAdminInput-div">
                    <input className="form-control"
                        {...register("adminName", {
                            required: "This field is required",
                            pattern: {
                                value: /^[A-Z]/,
                                message: "First letter should be uppercase",
                            },
                        })}
                        onKeyUp={() => trigger("adminName")}
                        type="text" id="" placeholder="Admin name" />
                    {errors.adminName && <small className="text-danger addAdminInput-err">{errors.adminName?.message}</small>}
                </div>
                <div className="col-md-5 addAdminInput-div">
                    <input className="form-control"
                        {...register("adminEmail", {
                            required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid Email Address",
                            },
                        })}
                        onKeyUp={() => trigger("adminEmail")}
                        type="text" id="" placeholder="Admin email address" />
                    {errors.adminEmail && <small className="text-danger addAdminInput-err">{errors.adminEmail?.message}</small>}
                </div>
                <div className="col-md-2 addAdminInput-btn-div">
                    <button type="submit" className={`btn btn-success ${pending && "disabled"}`} >{
                        pending ? <span><Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                        />Adding...</span> : "Add Admin"}</button>
                </div>
            </div>
        </form>
    );
};

export default AddAdmin;