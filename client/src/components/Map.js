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
			countries: props.getUserCountries(),
        };
		console.log('Map.js/constructor this.state.countries: ', this.state.countries);
		console.log('Map.js/constructor this.props.countries: ', this.props.countries);
        this.mapContainer = React.createRef();
    }
    
	deleteCountry = (id) => {
        this.props.deleteCountry(id)
    }

	getMap = (user, countries, deleteCountry) => {
        console.log("------>>>>>> I'M RUNNING getMap() FROM INSIDE Map.js <<<<<<------")
		console.log('alex, those are the countries by this user: ', countries)
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
				['in', 'ADM0_A3_IS'].concat(countries.filter(country => country.visited).map(country => country.country.code))
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
						<h3>${country.name}</h3>
						<strong>Capital:</strong> ${country.capital}
						<br><strong>Population:</strong> ${population}
						<br><strong>Demonym:</strong> ${country.demonym}
						<br><strong>Official languages:</strong> ${country.languages
							.map(l => l.name)
							.join(', ')}
						<br><strong>Currency:</strong> ${country.currencies
							.map(c => c.code)
							.join(', ')}
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
				['in', 'ADM0_A3_IS'].concat(countries.filter(country => !country.visited).map(country => country.country.code))
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
						<h3>${country.name}</h3>
						<strong>Capital:</strong> ${country.capital}
						<br><strong>Population:</strong> ${population}
						<br><strong>Demonym:</strong> ${country.demonym}
						<br><strong>Official languages:</strong> ${country.languages
							.map(l => l.name)
							.join(', ')}
						<br><strong>Currency:</strong> ${country.currencies
							.map(c => c.code)
							.join(', ')}
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
		this.getMap(this.state.user, this.props.countries, this.deleteCountry);
	}

    componentDidUpdate() {
		console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE Map.js <<<<<<------")
		this.getMap(this.state.user, this.props.countries, this.deleteCountry);
	}

    render() {
        console.log("------>>>>>> I'M RUNNING render() FROM INSIDE Map.js <<<<<<------")
        return (
            <div ref={this.mapContainer} className="map-container" />
        )
    }
}

export default Map;