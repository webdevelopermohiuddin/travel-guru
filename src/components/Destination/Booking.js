import React from 'react';
import Header from '../Header/Header';
import './Booking.css';
import TravelPlace from '../../FakeData/TravelPlaceInfo';
import { Link, useParams } from 'react-router-dom';

const Booking = () => {
    const { id } = useParams();
    const location = TravelPlace.find(data => data.id === id);
    const { name, details, origin } = location;
    return (
        <div id="backgroundImage">
            <Header />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6 my-auto">
                        <h1>{name}</h1>
                        <p>{details}</p>
                    </div>
                    <div className="col-md-6">
                        <form className="form-group bg-light p-5 m-3">
                            <label className="text-dark">Origin</label>
                            <input className='form-control bkg_input' type="text" placeholder={origin} disabled />
                            <label className="text-dark">Destination</label>
                            <input className='form-control' type="text" placeholder={name} disabled />
                            <div className='d-flex justify-content-between'>
                                <label htmlFor="" className="text-dark">Form</label>
                                <label htmlFor="" className="text-dark">To</label>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <input className='form-control' type="date" />
                                <input className='form-control' type="date" />
                            </div>
                            <Link to="/search" className="nav-link">
                               <button className='btn btn-warning btn-block mt-2'>Start Booking</button>
                            </Link>
                     </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;