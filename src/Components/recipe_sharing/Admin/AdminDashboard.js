import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import Eachuser from './Eachuser';
import { useSelector } from 'react-redux';



function AdminDashboard(){
    var[users,setUsers]=useState([]);
    const user = useSelector(store=>store.auth.user);
    function fetchUsers(){
        if (!user || !user.token) {
            // If user or user.token is not defined, do not proceed with the request
            return;
        }
        const headers = {
            'Authorization': `Bearer ${user.token}`
        };
        axios.get('http://127.0.0.1:8000/api/users',{headers})
        .then(response=>{
            setUsers(response.data)
        })
    };
    useEffect(()=>{
        fetchUsers()
    },[]);
    return(
        <><Navbar/>
        <br/>
        <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3><strong>Users</strong></h3>
                    </div>
                </div>
                <div className="row">
                    {users.map(user => (
                        <Eachuser key={user.id} user={user} refresh={fetchUsers} />
                    ))}
                </div>
            </div>
        </>
    )
}
export default AdminDashboard;