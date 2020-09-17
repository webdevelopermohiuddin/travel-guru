import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import hotelInfo from '../../FakeData/HotelInfo'
import Hotel from '../Hotel/Hotel';
import Header from '../Header/Header';

class Search extends Component {
    render() {
    return (
      <div>
        <Header/>
         <div className="container">
           <div className="row mt-2">
             <div className="col-md-8">
               <div className="row my-1">
                  {hotelInfo.map(data => <Hotel data={data}/>)}
               </div>
             </div>
             <div className="col-md-4">
             <Map google={this.props.google} zoom={14}>
 
            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

            <InfoWindow onClose={this.onInfoWindowClose}>
            </InfoWindow>
            </Map>
             </div>
           </div>
         </div>
      </div>
    );
 };
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBRJVrr_eG1r8KGtw7V2bkx_FqjtXTvKUc")
  })(Search)