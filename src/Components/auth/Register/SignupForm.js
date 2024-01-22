
import React from 'react';
import '../Login/LoginForm.css';
import { Link } from 'react-router-dom';
import Navbar from '../../recipe_sharing/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function SignupForm(){
  var [name, setName] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [passwordConf, setPasswordConf] = useState('');
  var [errorMessage, setErrorMessage] = useState('');
  var navigate = useNavigate();
  function registerUser(){
      var user = {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConf,
      }
      axios.post('http://127.0.0.1:8000/api/register',user).then(response=>{
          setErrorMessage('');
          navigate('/login');
      }).catch(error=>{
          if (error.response) {
              // The request was made and the server responded with a status code
              if (error.response.status === 400) {
                  setErrorMessage(Object.values(error.response.data).join(' '));
              } else {
                  setErrorMessage('Failed to connect to API');
              }
          } else if (error.request) {
              // The request was made but no response was received
              setErrorMessage('No response from the server. Please try again later.');
          } else {
              // Something happened in setting up the request that triggered an Error
              setErrorMessage('An unexpected error occurred. Please try again.');
          }
      })
  }
  return (
    <>
    <Navbar />
    <div className="first-container">
      <div className="secondi-container"></div>
      <div className='thirdf-container'>
        <form className="myform" action="">
          <h1>SIGN UP</h1>
          {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
          <div className="inputb" title='Your name'>
              <input type="text" placeholder="Name" required
              onInput={(event)=>setName(event.target.value)}/>
          </div>
          <div className="inputb">
              <input type="text" placeholder="Email" required 
              onInput={(event)=>setEmail(event.target.value)}/>
         </div>
          <div className="inputb">
              <input type="password" placeholder="Password" required
              onInput={(event)=>setPassword(event.target.value)} />
         </div>
         <div className="inputb">
              <input type="password" placeholder="Confirm Password" required
              onInput={(event)=>setPasswordConf(event.target.value)} />
         </div>
        <button type="button" onClick={registerUser}>SIGN UP</button>
        <div className="newuser">
              <p>Already Have Account?<Link to={'/login'}>Login Page</Link> </p>
        </div>
        </form>
      </div>
    </div>
    </>
    
  );
}

export default SignupForm;