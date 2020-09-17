import React from 'react';
import { Link } from 'react-router-dom';
import TravelPlace from '../../FakeData/TravelPlaceInfo';
import Header from '../Header/Header';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <div id="backgroundImage">
           <Header style={{color:"white"}}/>
        <div className="container">
            <div className="row d-flex align-items-center mt-4">
                <div className="col-md-4">
                    <h1>Cox's Bazar</h1>
                    <p>Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ...</p>
                    <Link to={`/booking/1`}>
                    <button className="btn btn-warning">Booking <FontAwesomeIcon icon={faArrowRight} /></button>
                    </Link>
                </div>
                <div className="col-md-8 d-flex">
                   {
                       TravelPlace.map(place => 
                           <div className="row">
                               <div className="col-md-4 m-1">
                                  <div className="placeImg">
                                   <Link to={`/booking/${place.id}`}><img src={place.img} className="img-fluid" alt=""/></Link> 
                                    <div className="text">
                                      <h2>{place.name}</h2>
                                    </div>
                                  </div>
                               </div>
                           </div>
                       )
                   }
                </div>
            </div>             
        </div>
        </div>   
    );
};

export default Home;