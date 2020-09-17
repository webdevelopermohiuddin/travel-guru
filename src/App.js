import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Booking from './components/Destination/Booking';



export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
       <Router>
        <Switch>
           <Route path="/home">
            <Home/>
           </Route>
           <Route path="/booking/:id">
            <Booking/>
           </Route>
           <Route path="/login">
             <Login/>
           </Route>
           <PrivateRoute path="/search">
            <Search/>
           </PrivateRoute>
           <Route exact path="/">
             <Home/>
           </Route>
           <Route path="*">
             <NotFound/>
           </Route>
        </Switch>
      </Router> 
    </UserContext.Provider>
  );
}

export default App;
