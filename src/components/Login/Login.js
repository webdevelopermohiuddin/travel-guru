import React, { useContext, useState } from 'react';
import './Login.css';
import fbIcon from '../../Icon/fb.png';
import googleIcon from '../../Icon/google.png';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';

const Login = () => {
     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
     const [newUser, setNewUser] = useState(false);
     const history = useHistory();
     const location = useLocation();
     const { from } = location.state || { from: { pathname: "/" } };

     if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);  
     }

     const googleProvider = new firebase.auth.GoogleAuthProvider();
     var fbProvider = new firebase.auth.FacebookAuthProvider();
     
    const handleGoogleSignin = () => {

        firebase.auth().signInWithPopup(googleProvider)
        .then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {
                isSignedIn: 'true',
                name: displayName,
                 email: email
                };
            setLoggedInUser(signedInUser);
            history.replace(from);
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    const handleFacebookSignin = () => {

        firebase.auth().signInWithPopup(fbProvider)
        .then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {
                isSignedIn: 'true',
                name: displayName,
                 email: email
                };
            setLoggedInUser(signedInUser);
            history.replace(from);
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      }
      
      const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
 
        }
        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value.length > 6;
          const passwordHasNumber = /\d{1}/.test(e.target.value);
          isFieldValid = (isPasswordValid && passwordHasNumber)
        }
        if(isFieldValid){
          const newUserInfo = {...loggedInUser};
          newUserInfo[e.target.name] = e.target.value;
          setLoggedInUser(newUserInfo);
          
        }
    }

      const handleSubmit = (e) => {
        if(newUser && loggedInUser.email && loggedInUser.password){
         firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
         .then(res => {
            const newUserInfo = {...loggedInUser};
            newUserInfo.error = " ";
            newUserInfo.success = true;
            setLoggedInUser(newUserInfo);
            updateUserName(loggedInUser.name);
            const signedInUser = {
              isSignedIn: 'true',
              name: res.user.displayName,
               email: res.user.email
              };
          setLoggedInUser(signedInUser);
          history.replace(from);
            
         })
         .catch( error => {
           const newUserInfo = {...loggedInUser};
           newUserInfo.error = error.message;
           newUserInfo.success = false;
           setLoggedInUser(newUserInfo);
         });
        }
   
        if(!newUser && loggedInUser.email && loggedInUser.password){
         firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
         .then(res => {
           const newUserInfo = {...loggedInUser};
           newUserInfo.error = " ";
           newUserInfo.success = true;
           setLoggedInUser(newUserInfo);
           updateUserName(loggedInUser.name);
           const signedInUser = {
            isSignedIn: 'true',
            name: res.user.displayName,
             email: res.user.email
            };
        setLoggedInUser(signedInUser);
        history.replace(from);
           
         })
         .catch(function(error) {
           const newUserInfo = {...loggedInUser};
           newUserInfo.error = error.message;
           newUserInfo.success = false;
           setLoggedInUser(newUserInfo);
         });
        }
   
        e.preventDefault();
      }

      const updateUserName = name => {
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });
       }

    return (
       <div>
         <Header/>
         <div className="container">
            <div className="row mt-3 justify-content-center">
                <div className="col-md-6 border border-secondary">
                    <div>
                        <h1>Login</h1>
                         <br/>
                        <form onSubmit={handleSubmit}>
                        {newUser && <input type="name" name="name" className="form-control" onBlur={handleBlur} placeholder="Your name" required/>}
                            <br/>
                            <input type="text" name="email" className="form-control" onBlur={handleBlur} placeholder="Your email" required />
                            <br />
                            <input type="password" name="password" className="form-control" onBlur={handleBlur} placeholder="password" required/>
                             <br/>
                            <div className="row d-flex justify-content-around text-center">
                                <div className="col-6">
                                    <input type="checkbox" value="remember" />
                                    <label>Remember Me</label>
                                </div>
                                <div className="col-6">
                                    <span className="text-right">Forgot Password</span>
                                </div>
                            </div> 
                            <br />
                            <input type="submit" className="btn btn-warning btn-block" value={newUser ? "Sign up" : "Sign In" }/>
                           
                            <p className="text-center">Don't have an account?<span onClick={() => setNewUser(!newUser)} style={{color: "blue"}}>Create a new account</span></p>
                        </form>
                        <p style={{color: 'red', textAlign: 'center'}}>{loggedInUser.error}</p>
                        {
                           loggedInUser.success && <p style={{color: 'green'}}>User {newUser ? "created" : "logged in"} successfully</p>
                         }
                    </div>
                    <p className="text-center">or</p>
                    <div className="row m-2 border border-secondary rounded-pill">
                        <div className="col-2">
                            <img src={googleIcon} className="imageSizing" alt="" />
                        </div>
                        <div className="col-8 text-center">
                            <p  onClick={handleGoogleSignin}>Continue with Google</p>
                        </div>
                    </div>
                    <div className="row m-2 border border-secondary rounded-pill">
                        <div className="col-2">
                            <img src={fbIcon} className="imageSizing" alt="" />
                        </div>
                        <div className="col-8 text-center">
                            <p onClick={handleFacebookSignin}>Continue with Facebook</p>
                        </div>
                    </div>
                </div>
            </div>
         </div> 
       </div>  
    );
};

export default Login;