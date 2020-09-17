import React, { createContext, useState } from 'react';
import './App.css';
import Destination from './components/Destination/Destination';
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


export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
       <Router>
        <Header/>
        <Switch>
           <Route path="/home">
            <Home/>
           </Route>
           <Route path="/destination">
            <Destination/>
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
