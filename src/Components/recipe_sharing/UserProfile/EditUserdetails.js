import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserFromLocalStorage } from "../../../Store/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function EditUserdetails() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth.user);
    var [userdata, setUserdata] = useState({});
    const[bio,setBio]=useState('');
    var navigate=useNavigate();

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
                    setBio(response.data.bio);
                })
                .catch((error) => {
                    // Handle error, e.g., log it or show a message to the user
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user]);
    function updateBio(){
        axios.patch('http://127.0.0.1:8000/api/user/edit',{
            bio: bio,
        },  {
            headers:{'Authorization':"Bearer "+ user.token}}).then(response=>{
            alert(response.data.message)
        });
        navigate('/user/userdashboard');
    }

    return (<>
        <Navbar/>
        <br></br>
        <br></br>
        <br></br>
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="col-md-6 mb-3 d-flex">
                <div className="card flex-fill bg-light text-dark" style={{ border: '2px solid #0099cc' }}>
                    <div className="card-body">
                        <h5 className="card-title">Name: {userdata.name}</h5>
                        <p className="card-text">Email: {userdata.email}</p>
                        <p className="card-text">Bio:
                            <input 
                                type="text" 
                                className="form-control" 
                                value={bio} 
                                onChange={(event) => { setBio(event.target.value) }}
                                style={{ borderColor: '#0099cc' }}
                            />
                        </p>
                        <div>
                            <Link to="/user/userdashboard" className="btn btn-success" style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>
                                Cancel
                            </Link>
                            <Link onClick={updateBio} className="btn btn-primary ml-5" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                                Update
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default EditUserdetails;
