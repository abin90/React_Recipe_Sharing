import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Eachuser(props) {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(store => store.auth.user);
    const headers = {
        'Authorization': `Bearer ${user.token}`
    };

    const handleBlockUser = () => {
        axios.post(`http://127.0.0.1:8000/api/admin/block/${props.user.id}`, {}, { headers })
            .then(() => {
                setShowModal(false);
                props.refresh();
            });
    };

    const handleUnblockUser = () => {
        setShowModal(true);
    };

    const confirmUnblockUser = () => {
        axios.post(`http://127.0.0.1:8000/api/admin/unblock/${props.user.id}`, {}, { headers })
            .then(() => {
                setShowModal(false);
                props.refresh();
            });
    };

    return (
        <div className="col-md-6 mb-3 d-flex">
            <div className="card flex-fill">
                <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{props.user.name}</h5>
                    <p className="card-text">Email: {props.user.email}</p>
                    <p className="card-text">Bio: {props.user.bio}</p>
                    <div>
                        <Link to={`/admin/${props.user.id}/recipes`} className="btn btn-primary">Recipes</Link>

                        {props.user.blocked ? (
                            <button className="btn btn-success ml-2" onClick={handleUnblockUser}>Unblock User</button>
                        ) : (
                            <button className="btn btn-danger ml-2" onClick={() => setShowModal(true)}>Block User</button>
                        )}

                        {/* Modal for confirmation */}
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm {props.user.blocked ? 'Unblock' : 'Block'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to {props.user.blocked ? 'unblock' : 'block'} this user?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant={props.user.blocked ? "success" : "danger"} onClick={props.user.blocked ? confirmUnblockUser : handleBlockUser}>
                                    {props.user.blocked ? 'Unblock' : 'Block'}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Eachuser;
