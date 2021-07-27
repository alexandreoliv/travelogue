import React, { Component } from 'react';
import './App.css';
import TravelList from './components/travels/TravelList';
// import TravelDetails from './components/travels/TravelDetails';
// import { Route } from 'react-router-dom';
import axios from 'axios';
import Map from './components/Map';
import AddTravel from './components/travels/AddTravel';

class App extends Component {
	state = {
            travels: [],
			countries: []
    };

	getAllCountries = () => {
		console.log("------>>>>>> I'M RUNNING getAllCountries() FROM INSIDE App.js <<<<<<------")
        axios.get('https://restcountries.eu/rest/v2/all')
        .then (response => {
            this.setState({
                countries: response.data
            })
            console.log('countries from inside app.js/getAllCountries: ', this.state.countries);
        })
        .catch(err => console.log(err));
    }

	getAllTravels = () => {
		console.log("------>>>>>> I'M RUNNING getAllTravels() FROM INSIDE App.js <<<<<<------")
        axios.get('http://localhost:5005/api/travels')
        .then (response => {
            this.setState({
                travels: response.data,
            })
			if (this.state.travels.length === 0) return 0;
            console.log('travels from inside app.js/getAllTravels: ', this.state.travels);
        })
        .catch(err => console.log(err));
    }

	addTravel = (country, countryCode, city, date) => {
        console.log("------>>>>>> I'M RUNNING addTravel() FROM INSIDE App.js <<<<<<------")
		console.log("this is props inside App.js/addTravel: ", this.props)
        axios({
			method: 'post',
			url: `http://localhost:5005/api/travels`,
			data: {
				country,
				countryCode,
				city,
				date
			}
		})			
        .then(resp => {
            console.log('resp from axios from inside App.js/addTravel: ', resp);
            this.getAllTravels();
        })
        .catch(err => {
            console.log(err);
        })
    }

	deleteTravel = (id) => {
        console.log("------>>>>>> I'M RUNNING deleteTravel() FROM INSIDE App.js <<<<<<------")
		console.log("this is props inside App.js/deleteTravel: ", this.props)
        // console.log('this is this.props.match.params.id from inside App.js/deleteTravel: ', this.props.match.params.id)
        // const travelId = this.props.match.params.id;
        axios
		.delete(`http://localhost:5005/api/travels/${id}`)
        .then(resp => {
            console.log('resp from axios from inside App.js/deleteTravel: ', resp);
            this.setState({
                travels: this.state.travels.filter(travel => travel._id !== resp.data._id)
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

	componentDidMount() {
		console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE App.js <<<<<<------")
		this.getAllTravels();
		this.getAllCountries();
	}

	componentDidUpdate(prevProps) {
		console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE App.js <<<<<<------")
		if (prevProps !== this.props)
            this.getAllTravels();
	}

	render() {
		console.log("------>>>>>> I'M RUNNING render() FROM INSIDE App.js <<<<<<------")
		if (this.state.travels.length === 0) {
			console.log('from inside app.js/render(): still no travels in the state, lets call getAllTravels from render');
			return <></>;
		}
		return (
			<div className="App">
				<Map travels={this.state.travels} />
				<AddTravel 
					addTravel={this.addTravel}
					countries={this.state.countries}
				/>
				<TravelList
					travels={this.state.travels}
					getAllTravels={this.getAllTravels}
					deleteTravel={this.deleteTravel}
				/>
				{/* <Route
					exact path='/travels/:id'
					component={TravelDetails}
        		/> */}
			</div>
		)
	}
}

export default App;