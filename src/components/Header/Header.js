import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../Logo.png'
import './Header.css';
import * as firebase from "firebase/app";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
       const signOutUser = {
         isSignedIn: false,
         name: '', 
         email: '',
         error: '', 
         success: false
       }
       setLoggedInUser(signOutUser);
    })
    .catch(err => {

    })
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
        <img src={logo} alt="company-logo" className="navbar-brand px-3" id="logo" />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0 mx-auto ">
            <input className="form-control mr-sm-2" type="search" placeholder="Search your destination" aria-label="Search" />
            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
          </form>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active px-2">
              <Link to="/home" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/booking/1" className="nav-link text-white">Booking</Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/search" className="nav-link text-white">Search</Link>
            </li>
          </ul>
          <h4>{loggedInUser.name}</h4>
                {
        loggedInUser.isSignedIn || loggedInUser.name ? 
        <Link to="/login" className="nav-link">
        <button type="button" className="btn btn-outline-warning" onClick={handleSignOut}>Sign Out</button>
      </Link>
        :
        <Link to="/login" className="nav-link">
        <button type="button" className="btn btn-outline-warning">Log in</button>
      </Link>
      }
        </div>
      </nav>
    </div>
  );
};

export default Header;