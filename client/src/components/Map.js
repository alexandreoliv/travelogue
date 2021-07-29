import React, { Component } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import './mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGFuZHJlb2xpdiIsImEiOiJja3FtYTIxYm4wMHJkMnVtaGMyZ2t2dmF0In0.AVesP7QNz89Q7ND7AF2ikQ';

class Map extends Component {
    constructor(props) {
        console.log("------>>>>>> I'M RUNNING constructor() FROM INSIDE Map.js <<<<<<------")
        console.log('props from inside Map.js/constructor', props)
        
        super(props);
        this.state = {
            lat: 13.4050,
            lng: 52.5200,
            zoom: 1.5,
			user: props.user,
            // countryCodes: props.travels.filter(travel => (travel.owner === props.user._id) && travel.visited).map(travel => travel.country.code),
			// travels: props.travels
			travels: props.getUserTravels(),
			// visitedCodes: props.travels.filter(travel => (travel.owner === props.user._id) && travel.visited).map(travel => travel.country.code),
			// notVisitedCodes: props.travels.filter(travel => (travel.owner === props.user._id) && !travel.visited).map(travel => travel.country.code)
        };
        this.mapContainer = React.createRef();
    }
    
    getMap = (user, travels) => {
        console.log("------>>>>>> I'M RUNNING getMap() FROM INSIDE Map.js <<<<<<------")
		console.log('alex, those are the travels by this user: ', travels)
        // const countryCodes = this.props.travels.map(travel => travel.countryCode);
		// const countryCodes = this.props.travels.filter(country => country.visited).map(travel => travel.country.code);
		console.log('visitedCodes inside Map.js/getMap: ', this.state.visitedCodes);
		const { lat, lng, zoom } = this.state;
		const map = new mapboxgl.Map({
		  	container: this.mapContainer.current,
			// style: 'mapbox://styles/mapbox/streets-v11',
			style: 'mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k',
		  	center: [lat, lng],
		  	zoom: zoom
		});

		map.on('load', function() {
			// On map load, we want to do some stuff
			map.addLayer({
			  	// here we are adding a layer containing the tileset we just uploaded
				id: 'countriesVisited', // this is the name of our layer, which we will need later
				source: {
					type: 'vector',
					url: 'mapbox://alexandreoliv.6ryseghu', // <--- Add the Map ID you copied here
				},
				'source-layer': 'ne_10m_admin_0_countries-1c8n19', // <--- Add the source layer name you copied here
				type: 'fill',
				paint: {
					'fill-color': '#C9F983', // this is the color you want your tileset to have (I used a nice purple color)
					'fill-opacity': 0.5,
					// 'fill-outline-color': '#F2F2F2', // this helps us distinguish individual countries a bit better by giving them an outline
				},
			});

			map.setFilter(
				'countriesVisited',
				// ['in', 'ADM0_A3_IS'].concat(['USA', 'AUS', 'NGA']),
				['in', 'ADM0_A3_IS'].concat(travels.filter(travel => travel.visited).map(travel => travel.country.code))
			); // This line lets us filter by country codes.

			map.on('click', 'countriesVisited', function(mapElement) {
				const cCode = mapElement.features[0].properties.ADM0_A3_IS; // Grab the country code from the map properties.
				fetch(`https://restcountries.eu/rest/v2/alpha/${cCode}`) // Using tempalate tags to create the API request
					.then(data => data.json()) // fetch returns an object with a .json() method, which returns a promise
					.then(country => {
						// country contains the data from the API request
						// Let's build our HTML in a template tag
						const population = country.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
						const html = ` 
						<img src='${country.flag}' height="50px"/> 
						<ul>
						<li><h3>${country.name}</h3></li>
						<li><h2>${user.username} has visited ${travels.filter(travel => travel.country.code === country.alpha3Code).map(travel => travel.city)}</h2></li>
						<li><strong>Currencies:</strong> ${country.currencies
							.map(c => c.code)
							.join(', ')}</li>
						<li><strong>Official languages:</strong> ${country.languages
							.map(l => l.name)
							.join(', ')}</li>
						<li><strong>Capital:</strong> ${country.capital}</li>
						<li><strong>Population:</strong> ${population}</li>
						<li><strong>Demonym:</strong> ${country.demonym}</li>
						</ul>
						`; // Now we have a good looking popup HTML segment.
						new mapboxgl.Popup() // Create a new popup
						.setLngLat(mapElement.lngLat) // Set where we want it to appear (where we clicked)
						.setHTML(html) // Add the HTML we just made to the popup
						.addTo(map); // Add the popup to the map
					});
			});

			map.addLayer({
				// here we are adding a layer containing the tileset we just uploaded
				id: 'countriesNotVisited', // this is the name of our layer, which we will need later
				source: {
					type: 'vector',
					url: 'mapbox://alexandreoliv.6ryseghu', // <--- Add the Map ID you copied here
				},
				'source-layer': 'ne_10m_admin_0_countries-1c8n19', // <--- Add the source layer name you copied here
				type: 'fill',
				paint: {
					'fill-color': '#000000', // this is the color you want your tileset to have (I used a nice purple color)
					'fill-opacity': 0.5,
					// 'fill-outline-color': '#F2F2F2', // this helps us distinguish individual countries a bit better by giving them an outline
				},
		  	});

			map.setFilter(
				'countriesNotVisited',
				// ['in', 'ADM0_A3_IS'].concat(['USA', 'AUS', 'NGA']),
				['in', 'ADM0_A3_IS'].concat(travels.filter(travel => !travel.visited).map(travel => travel.country.code))
			); // This line lets us filter by country codes.

			map.on('click', 'countriesNotVisited', function(mapElement) {
				const cCode = mapElement.features[0].properties.ADM0_A3_IS; // Grab the country code from the map properties.
				fetch(`https://restcountries.eu/rest/v2/alpha/${cCode}`) // Using tempalate tags to create the API request
					.then(data => data.json()) // fetch returns an object with a .json() method, which returns a promise
					.then(country => {
						// country contains the data from the API request
						// Let's build our HTML in a template tag
						const population = country.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
						const html = ` 
						<img src='${country.flag}' height="50px"/> 
						<ul>
						<li><h3>${country.name}</h3></li>
						<li><h2>${user.username} plans to visit ${travels.filter(travel => travel.country.code === country.alpha3Code).map(travel => travel.city)}</h2></li>
						<li><strong>Currencies:</strong> ${country.currencies
							.map(c => c.code)
							.join(', ')}</li>
						<li><strong>Official languages:</strong> ${country.languages
							.map(l => l.name)
							.join(', ')}</li>
						<li><strong>Capital:</strong> ${country.capital}</li>
						<li><strong>Population:</strong> ${population}</li>
						<li><strong>Demonym:</strong> ${country.demonym}</li>
						</ul>
						`; // Now we have a good looking popup HTML segment.
						new mapboxgl.Popup() // Create a new popup
						.setLngLat(mapElement.lngLat) // Set where we want it to appear (where we clicked)
						.setHTML(html) // Add the HTML we just made to the popup
						.addTo(map); // Add the popup to the map
					});
			});
		});
	}

    componentDidMount() {
		console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE Map.js <<<<<<------")
		this.getMap(this.state.user, this.props.travels);
	}

    componentDidUpdate() {
		console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE Map.js <<<<<<------")
		this.getMap(this.state.user, this.props.travels);
	}

    render() {
        console.log("------>>>>>> I'M RUNNING render() FROM INSIDE Map.js <<<<<<------")
        // if (this.state.travels.length === 0) {
        //     console.log('from inside maps.js/render(): STILL NO COUNTRYCODES IN THE STATE');
        // }
        // else console.log('from inside maps.js/render(): COUNTRYCODES IN THE STATE: ', this.state.travels );
        return (
            <div ref={this.mapContainer} className="map-container" />
        )
    }
}

export default Map;