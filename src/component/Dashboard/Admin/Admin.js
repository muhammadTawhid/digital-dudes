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
            <div className="col-md-2">
                <Sidebar />
            </div>
            <div className="col-md-10 mb-5">
                <h2 className="text-center brand-text">List of Admins</h2>
                <Table hover className='container text-center '>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Admins</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map((data, index) =>
                                <tr key={data._id}>
                                    <td>{index + 1}</td>
                                    <td><img style={{ width: "35px", clipPath: "circle()" }} src={data.adminImg} alt="" /></td>
                                    <td>{data.adminName}</td>
                                    <td>{data.adminEmail}</td>
                                    <td>{data.adminType}</td>
                                    <td><button onClick={() => handleRemoveAdmin(data._id)} className={`btn btn-danger ${data.adminType === "Main" && "disabled"}`}>Remove</button></td>
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
                <AddAdmin setAdmins={setAdmins} />
            </div>
        </div>

    );
};

export default Admin;