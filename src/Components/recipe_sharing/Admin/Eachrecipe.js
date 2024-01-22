import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Eachrecipe(props) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(store=>store.auth.user);
  const handleDelete = () => {
    const headers = {
        'Authorization': `Bearer ${user.token}`
    };
    axios.post(`http://127.0.0.1:8000/api/${props.recipe.id}/delete`, {}, { headers })
        .then(() => {
            setShowModal(false);
            props.refresh();
        })
  };

  return (
    <div className="col-md-6 mb-3 d-flex">
      <div className="card flex-fill">
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{props.recipe.title}</h5>
          <p className="card-text">Ingredients: {props.recipe.ingredients}</p>
          <p className="card-text">Steps: {props.recipe.steps}</p>
          <p className="card-text">Cooking time: {props.recipe.cooking_time} minutes</p>
          <p className="card-text">Difficulty level: {props.recipe.difficulty_level}</p>
          <p className="card-text">Rating: {props.recipe.rating}</p>
          <div>
            <Link
              to="#"
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Delete
            </Link>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the recipe: {props.recipe.title}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Eachrecipe;
