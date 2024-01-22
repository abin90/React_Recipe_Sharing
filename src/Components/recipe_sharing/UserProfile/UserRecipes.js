import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserFromLocalStorage } from "../../../Store/authSlice";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function UserRecipes() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth.user);
    const [recipes, setRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // Load user data from local storage on component mount
    useEffect(() => {
        dispatch(setUserFromLocalStorage());
    }, [dispatch]);

    // Fetch user data when user or token changes
    useEffect(() => {
        if (user && user.token) {
            const headers = {
                Authorization: `Bearer ${user.token}`,
            };
            const userId = user.id;

            axios.get(`http://127.0.0.1:8000/api/user/${userId}/recipes`, { headers })
                .then((response) => {
                    setRecipes(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user]);

    const handleDelete = () => {
        if (selectedRecipe) {
            const headers = {
                Authorization: `Bearer ${user.token}`,
            };
            axios.post(`http://127.0.0.1:8000/api/recipes/${selectedRecipe.id}/delete`, {}, { headers })
                .then(() => {
                    setShowModal(false);
                    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== selectedRecipe.id));
                });
        }
    };

    return (
        <div className="container">
            <div className="row">
                {/* Map through recipes and render a card for each */}
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-primary">Title: {recipe.title}</h5>
                                <p className="card-text">Ingredients: {recipe.ingredients}</p>
                                <p className="card-text">Steps: {recipe.steps}</p>
                                <p className="card-text">Time: {recipe.cooking_time} minutes</p>
                                <p className="card-text">Difficulty: {recipe.difficulty_level}</p>
                                <p className="card-text">Rating: {recipe.rating}</p>
                                <p className="card-text">Likes: {recipe.likes}</p>
                                <div>
                                    <Link to={`/edit/${recipe.id}/recipe`} className="btn btn-primary mr-2">Edit</Link>
                                    <Link
                                        to="#"
                                        onClick={() => {
                                            setShowModal(true);
                                            setSelectedRecipe(recipe);
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Bootstrap Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the recipe?</Modal.Body>
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

export default UserRecipes;
