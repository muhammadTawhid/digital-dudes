import './AddReview.css';
import React from 'react';
import { useState } from 'react';
import ActionPageForm from '../ActionPageForm/ActionPageForm';
import Sidebar from '../Sidebar/Sidebar';

const AddReview = () => {
    const [addReview, setAddReview] = useState(true)

    return (
        <div className="row">
            <div className="col-lg-2">
                <Sidebar />
            </div>
            <div className="col-lg-10 addReview-div">
                <ActionPageForm addReview={addReview} setAddReview={setAddReview} />
            </div>
        </div>
    );
};

export default AddReview;