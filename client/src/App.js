import React, { Component } from 'react';
import './App.css';
import TravelList from './components/travels/TravelList';
// import TravelDetails from './components/travels/TravelDetails';
// import { Route } from 'react-router-dom';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGFuZHJlb2xpdiIsImEiOiJja3FtYTIxYm4wMHJkMnVtaGMyZ2t2dmF0In0.AVesP7QNz89Q7ND7AF2ikQ';

// new code, let's see if it works
// const express = require("express");
// const app = express();
// const travelRouter = require("./routes/travel");
// app.use("/", travelRouter);
// new code, let's see if it works

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 13.4050,
			lng: 52.5200,
			zoom: 9
		};
		this.mapContainer = React.createRef();
	}

	componentDidMount() {
		const { lat, lng, zoom } = this.state;
		const map = new mapboxgl.Map({
		  container: this.mapContainer.current,
		  style: 'mapbox://styles/mapbox/streets-v11',
		  center: [lat, lng],
		  zoom: zoom
		});
	  }

	render() {
		return (
			<div className="App">
				<div ref={this.mapContainer} className="map-container" />
				<TravelList />
				{/* <Route
					exact path='/travels/:id'
					component={TravelDetails}
        		/> */}
			</div>
		)
	}
}

export default App;