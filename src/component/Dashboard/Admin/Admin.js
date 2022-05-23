import './Admin.css';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import AddAdmin from '../AddAdmin/AddAdmin';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const Admin = () => {
    const [admins, setAdmins] = useState([]);
    const skeletonData = ["1", "2", "3", "4", "5", "6"];

    useEffect(() => {
        axios.get('https://digital-dudes.herokuapp.com/admins')
            .then(res => setAdmins(res.data))
    }, [])

    const handleRemoveAdmin = adminId => {
        axios.delete('https://digital-dudes.herokuapp.com/deleteAdmin/' + adminId)
            .then(res => {
                if (res) {
                    axios.get('https://digital-dudes.herokuapp.com/admins')
                        .then(res => setAdmins(res.data))
                }
            })
    }

    return (
        <div className="row sidebar-row">
            <div className="col-md-2 sidebar-col">
                <Sidebar />
            </div>
            <div className="col-md-10 mb-5 adminsTable-div">
                <h2 className="text-center brand-text">Admins List</h2>
                <div className="scrollable-admins-table">
                    <Table hover className="container admins-table">
                        <thead className="table-header">
                            <tr>
                                <th><span>#</span></th>
                                <th><span>Admins</span></th>
                                <th><span>Name</span></th>
                                <th><span>Email</span></th>
                                <th><span>Type</span></th>
                                <th><span>Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                admins.map((data, index) =>
                                    <tr key={data._id}>
                                        <td><span>{index + 1}</span></td>
                                        <td><span><img style={{ width: "35px", clipPath: "circle()" }} src={data.adminImg} alt="" /></span></td>
                                        <td><span>{data.adminName}</span></td>
                                        <td><span>{data.adminEmail}</span></td>
                                        <td><span>{data.adminType}</span></td>
                                        <td><span><button onClick={() => handleRemoveAdmin(data._id)} className={`btn btn-danger ${data.adminType === "Main" && "disabled"}`}>Remove</button></span></td>
                                    </tr>
                                )
                            }
                            {admins[0] === undefined &&
                                skeletonData.map((data, index) =>
                                    <tr key={data}>
                                        <td><Skeleton width={15} height={20} /></td>
                                        <td><Skeleton className="rounded-circle" width={40} height={40} /></td>
                                        <td><Skeleton width={90} height={20} /></td>
                                        <td><Skeleton width={200} height={20} /></td>
                                        <td><Skeleton width={90} height={20} /></td>
                                        <td><Skeleton width={90} height={40} /></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                <AddAdmin setAdmins={setAdmins} />
            </div>
        </div>

    );
};

export default Admin;