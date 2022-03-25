import React, { Component } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGFuZHJlb2xpdiIsImEiOiJja3FtYTIxYm4wMHJkMnVtaGMyZ2t2dmF0In0.AVesP7QNz89Q7ND7AF2ikQ';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 13.4050,
            lng: 52.5200,
            zoom: 1.5,
			user: props.user,
			countries: props.getUserCountries(),
        };
        this.mapContainer = React.createRef();
    }
    
	deleteCountry = (id) => {
        this.props.deleteCountry(id)
    }

	getMap = (countries) => {
		const { lat, lng, zoom } = this.state;
		const map = new mapboxgl.Map({
		  	container: this.mapContainer.current,
			// style: 'mapbox://styles/mapbox/streets-v11',
			style: 'mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k',
		  	center: [lat, lng],
		  	zoom: zoom
		});

		map.on('load', function() {
			// on map load, we want to do some stuff
			map.addLayer({
			  	// here we are adding a layer containing the tileset we just uploaded
				id: 'countriesVisited', // this is the name of our layer, which we will need later
				source: {
					type: 'vector',
					url: 'mapbox://alexandreoliv.6ryseghu', // <--- add the Map ID you copied here
				},
				'source-layer': 'ne_10m_admin_0_countries-1c8n19', // <--- add the source layer name you copied here
				type: 'fill',
				paint: {
					'fill-color': '#62F6B6', // this is the color you want your tileset to have
					'fill-opacity': 0.5,
				}
			});

			map.setFilter(
				'countriesVisited',
				['in', 'ADM0_A3_IS'].concat(countries.filter(country => country.visited).map(country => country.country.code))
			);
			
			map.on('click', 'countriesVisited', function(mapElement) {
				const cCode = mapElement.features[0].properties.ADM0_A3_IS; // grab the country code from the map properties
				fetch(`https://restcountries.com/v2/alpha/${cCode}`) // using template tags to create the API request
					.then(data => data.json()) // fetch returns an object with a .json() method, which returns a promise
					.then(country => {
						// country contains the data from the API request
						// let's build our HTML in a template tag
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
						`; // now we have a good looking popup HTML segment
						new mapboxgl.Popup() // create a new popup
						.setLngLat(mapElement.lngLat) // set where we want it to appear (where we clicked)
						.setHTML(html) // add the HTML we just made to the popup
						.addTo(map); // add the popup to the map
					});
			});

			map.addLayer({
				// here we are adding a layer containing the tileset we just uploaded
				id: 'countriesNotVisited', // this is the name of our layer, which we will need later
				source: {
					type: 'vector',
					url: 'mapbox://alexandreoliv.6ryseghu', // <--- add the Map ID you copied here
				},
				'source-layer': 'ne_10m_admin_0_countries-1c8n19', // <--- add the source layer name you copied here
				type: 'fill',
				paint: {
					'fill-color': '#ECF662', // this is the color you want your tileset to have (I used a nice purple color)
					'fill-opacity': 0.5,
				}
		  	});

			map.setFilter(
				'countriesNotVisited',
				['in', 'ADM0_A3_IS'].concat(countries.filter(country => !country.visited).map(country => country.country.code))
			);

			map.on('click', 'countriesNotVisited', function(mapElement) {
				const cCode = mapElement.features[0].properties.ADM0_A3_IS; // grab the country code from the map properties
				fetch(`https://restcountries.com/v2/alpha/${cCode}`) // using template tags to create the API request
					.then(data => data.json()) // fetch returns an object with a .json() method, which returns a promise
					.then(country => {
						// country contains the data from the API request
						// let's build our HTML in a template tag
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
						`; // now we have a good looking popup HTML segment
						new mapboxgl.Popup() // create a new popup
						.setLngLat(mapElement.lngLat) // set where we want it to appear (where we clicked)
						.setHTML(html) // add the HTML we just made to the popup
						.addTo(map); // add the popup to the map
					});
			});
		});
	}

    componentDidMount() {
		this.getMap(this.props.countries);
	}

    componentDidUpdate() {
		this.getMap(this.props.countries);
	}

    render() {
        return (
            <div ref={this.mapContainer} className="map-container" />
        )
    }
}

export default Map;