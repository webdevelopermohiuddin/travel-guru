import React from 'react';
import star from '../../Icon/star_1_.png';
import './Hotel.css';

const Hotel = (props) => {
    const {img, title, guest, bedroom, bathroom, details, rating, price} = props.data;
    return (
        <>
           <div className="col-md-4">
               <img src={img} className="img-fluid" alt=""/>
            </div>
            <div className="col-md-8">
                <h5>{title}</h5>
                <p><span>{guest}</span><span>{bedroom}</span><span>{bathroom}</span></p>
                <p>{details}</p>
                <p><img src={star} id="img" alt=""/>{rating}</p>
                <p>{price}</p>
            </div>  
        </>
    );
};

export default Hotel;