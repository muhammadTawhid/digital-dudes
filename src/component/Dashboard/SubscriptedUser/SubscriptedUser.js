import './SubscriptedUser.css';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SubscriptedUser = ({ subscriptedUser }) => {
    const todaysDate = new Date(new Date().toISOString().substring(0, 10));
    const skeletonData = ["1", "2", "3", "4", "5", "6"];

    return (
        <div className="scrollable-subscriptedUser-table">
            <table className="text-cente table table-hover containe">
                <thead>
                    <tr>
                        <th className="table-heading"><span>#</span></th>
                        <th className="table-heading"><span>Name</span></th>
                        <th className="table-heading"><span>Email</span></th>
                        <th className="table-heading"><span><span id="subscription-text">Subscription</span> Type</span></th>
                        <th className="table-heading"><span>Expiration <span id="period-text">Period</span></span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subscriptedUser.map((user, index) =>
                            <tr key={user._id}>
                                <td><span>{index + 1}</span></td>
                                <td><span>{user.name}</span></td>
                                <td><span>{user.email}</span></td>
                                <td><span>{user.paymentFor}</span></td>
                                <td>
                                    {
                                        (Math.ceil(Math.abs(new Date(user.paymentDate) - todaysDate) / (1000 * 60 * 60 * 24)) <= 30)
                                            ?
                                            (30 - Math.ceil(Math.abs(new Date(user.paymentDate) - todaysDate) / (1000 * 60 * 60 * 24)) + " days remaining")
                                            :
                                            <span className="text-danger">Subscription <span id="disabled-text">disabled</span></span>
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