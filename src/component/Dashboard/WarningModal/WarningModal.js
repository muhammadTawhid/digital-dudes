import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const WarningModal = (props) => {
    const { onHide, serviceDeleteId, setServiceData } = props;

    const handleDeleteService = serviceDeleteId => {
        axios.delete('https://digital-dudes.onrender.com/deleteService/' + serviceDeleteId)
            .then(res => {
                if (res) {
                    onHide();
                    axios.get('https://digital-dudes.onrender.com/services')
                        .then(res => setServiceData(res.data))
                }
            })
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="bg-danger text-white" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Are you sure you want to permanently remove this service?</h6>
                <p>You can't undo this action.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={onHide}>Cancel</Button>
                <Button variant="outline-danger" onClick={() => handleDeleteService(serviceDeleteId)}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WarningModal;