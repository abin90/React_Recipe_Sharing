
import React from 'react';
import './LoginForm.css';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../../recipe_sharing/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { setUser } from '../../../Store/authSlice';



function LoginForm() {
  var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate=useNavigate();
    function attemptLogin() {
        axios.post('http://127.0.0.1:8000/api/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                id: String(response.data.id),
                token:response.data.token,
                isAdmin: response.data.is_admin === 1,
            }
            dispatch(setUser(user));
            console.log(user);
            if (user.isAdmin) {
              navigate("/admin");
            } else {
              navigate("/activity");
          }
            
        }).catch(error=>{
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid username or password. Please try again.');
            } else if (error.response && error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to login user. Please contact admin');
            }
        });
    }
  return (
    <>
    <Navbar/>
    <div className="first-container">
      <div className="secondi-container"></div>
      <div className='thirdf-container'>
        <form className="myform" >
          <h1>LOGIN</h1>
          {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
          <div className="inputb">
            <input type="text" placeholder="Email" required 
            onInput={(event)=>setEmail(event.target.value)}/>
          </div>   
          <div className="inputb">
            <input type="password" placeholder="Password" required 
            onInput={(event)=>setPassword(event.target.value)}/>
          </div> 
          <button type="button" onClick={attemptLogin}>LOGIN</button>
          <div className="newuser">
            <p>New User ?<Link to='/register'>Register Here</Link></p>
          </div>
        </form>
      </div>
    </div>
  </> 
   );  
}

export default LoginForm;