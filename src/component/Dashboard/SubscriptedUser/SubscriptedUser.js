import './SubscriptedUser.css';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SubscriptedUser = ({ subscriptedUser }) => {
    const todaysDate = new Date(new Date().toISOString().substring(0, 10));
    const skeletonData = ["1", "2", "3", "4", "5", "6"];

    return (
        <div className="scrollable-subscriptedUser-table">
            <table className="text-center table table-hover containe">
                <thead>
                    <tr>
                        <th className="table-heading">#</th>
                        <th className="table-heading">Name</th>
                        <th className="table-heading">Email</th>
                        <th className="table-heading"><span id="subscription-text">Subscription</span> Type</th>
                        <th className="table-heading">Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subscriptedUser.map((user, index) =>
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.paymentFor}</td>
                                <td>
                                    {
                                        (Math.ceil(Math.abs(new Date(user.paymentDate) - todaysDate) / (1000 * 60 * 60 * 24)) <= 30)
                                            ?
                                            (30 - Math.ceil(Math.abs(new Date(user.paymentDate) - todaysDate) / (1000 * 60 * 60 * 24)) + " days remaining")
                                            :
                                            <span className="text-danger">Subscription disabled</span>
                                    }
                                </td>
                            </tr>
                        )
                    }
                    {subscriptedUser[0] === undefined &&
                        skeletonData.map(data =>
                            <tr key={data}>
                                <td><Skeleton width={15} height={20} /></td>
                                <td><Skeleton width={90} height={20} /></td>
                                <td><Skeleton width={150} height={20} /></td>
                                <td><Skeleton width={90} height={20} /></td>
                                <td><Skeleton width={150} height={20} /></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SubscriptedUser;