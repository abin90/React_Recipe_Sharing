import React from "react";
import { Link } from "react-router-dom";
import Flavorster_logo from '../../Images/Flavorster_logo.png';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../../Store/authSlice";

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    if (user) {
      axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: { 'Authorization': "Bearer " + user.token }
      });
      dispatch(removeUser());
      navigate('/login');
    }
  };

  const whiteText = { color: 'white' };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link className="navbar-brand" to="/">
        <img src={Flavorster_logo} width="80" height="60" alt="" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={whiteText}>Home</Link>
          </li>
          {user ? (
            <>
              {user.isAdmin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to='/admin' style={whiteText}>Admin Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" style={whiteText} onClick={logout}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to='/user/userdashboard' style={whiteText}>Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/activity' style={whiteText}>Activities</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/create/recipe' style={whiteText}>Create Recipe</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" style={whiteText} onClick={logout}>Logout</Link>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={whiteText}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" style={whiteText}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
