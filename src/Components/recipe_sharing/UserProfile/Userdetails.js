import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserFromLocalStorage } from "../../../Store/authSlice";
import { Link } from "react-router-dom";

function Userdetails() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth.user);
    var [userdata, setUserdata] = useState({});

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

            axios
                .get(`http://127.0.0.1:8000/api/user/profile`, { headers })
                .then((response) => {
                    setUserdata(response.data);
                })
                .catch((error) => {
                    // Handle error, e.g., log it or show a message to the user
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user]);

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="col-md-6 mb-3 d-flex">
                <div className="card flex-fill bg-light text-dark shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Name: {userdata.name}</h5>
                        <p className="card-text">Email: {userdata.email}</p>
                        <p className="card-text">Bio: {userdata.bio}</p>
                        <p className="card-text">Followers: {userdata.followers_count}</p>
                        <p className="card-text">Following: {userdata.following_count}</p>
                        <div>
                            <Link to="/user/edit/profile" className="btn btn-primary">
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userdetails;
