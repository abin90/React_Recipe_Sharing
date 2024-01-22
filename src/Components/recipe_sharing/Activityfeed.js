import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Eachactivity from './Eachactivity';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from 'react-bootstrap';

function Activityfeed() {
    const [activity, setActivity] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    var user = useSelector(store => store.auth.user);

    function fetchActivity(pageNumber = 1) {
        const headers = {
            'Authorization': `Bearer ${user.token}`
        };
        axios.get(`http://127.0.0.1:8000/api/recipes/following-users?page=${pageNumber}`, { headers })
            .then(response => {
                setActivity(response.data);
            });
    }

    useEffect(() => {
        fetchActivity();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchActivity(pageNumber);
    }

    return (
        <>
            <Navbar />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>
                            <strong>Bring Out The Chef In You</strong>
                        </h3>
                    </div>
                </div>
                <div className="row">
                    {activity.recipes && activity.recipes.map(recipe => (
                        <Eachactivity key={recipe.id} recipe={recipe} refresh={fetchActivity} />
                    ))}
                </div>
                {activity.pagination && (
                    <div className="row">
                        <div className="d-flex justify-content-center"> {/* Apply 'd-flex justify-content-center' classes here */}
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
                                {Array.from({ length: activity.pagination.last_page }, (_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index + 1 === currentPage}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === activity.pagination.last_page}
                                />
                            </Pagination>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Activityfeed;
