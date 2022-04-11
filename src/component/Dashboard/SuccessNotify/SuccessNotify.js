import React from 'react';
import { Col, Row, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade';

const SuccessNotify = ({ successNotify, setSuccessNotify }) => {

    return (
        <Fade bottom when={successNotify}>
            <Row className="d-flex justify-content-center">
                <Col xs={4}>
                    <Toast onClose={() => setSuccessNotify(false)} show={successNotify} delay={3000} bg="success text-white text-center" autohide>
                        <Toast.Header className="text-dark">
                            <FontAwesomeIcon className="rounded me-1 text-success" icon={faCheckCircle} />
                            <strong className="me-auto">Success</strong>
                            <small>just now</small>
                        </Toast.Header>
                        <Toast.Body>Your action has been done successfully</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </Fade>
    );
};

export default SuccessNotify;