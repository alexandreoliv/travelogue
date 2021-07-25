import React, { Component } from 'react';
import './App.css';
import TravelList from './components/travels/TravelList';
// import TravelDetails from './components/travels/TravelDetails';
// import { Route } from 'react-router-dom';
import axios from 'axios';
import Map from './components/Map';

class App extends Component {
	// constructor(props) {
	// 	console.log("------>>>>>> I'M RUNNING constructor() FROM INSIDE App.js <<<<<<------")
    //     super(props);
    //     this.state = {
    //         travels: [],
    //         countryCodes: []
    //     };
    // }
	state = {
            travels: [],
            countryCodes: []
    };

	getAllTravels = () => {
		console.log("------>>>>>> I'M RUNNING getAllTravels() FROM INSIDE App.js <<<<<<------")
        axios.get('http://localhost:5005/api/travels')
        .then (response => {
            this.setState({
                travels: response.data,
				countryCodes: response.data.map(country => country.countryCode)
            })
            console.log('travels from inside app.js/getAllTravels: ', this.state.travels);
			console.log('countryCodes from inside app.js/getAllTravels: ', this.state.countryCodes);
        })
        .catch(err => console.log(err));
    }

	deleteTravel = () => {
        console.log("------>>>>>> I'M RUNNING deleteTravel() FROM INSIDE TravelDetails.js <<<<<<------")
        console.log('this is this.props.match.params.id from inside TravelDetails/deleteTravel: ', this.props.match.params.id)
        const travelId = this.props.match.params.id;
        axios
        .delete(`http://localhost:5005/api/travels/${travelId}`)
        .then(resp => {
            console.log('resp from axios from inside TravelDetails/deleteTravel: ', resp);
            this.setState({
                travel: resp.data
            })
        })
        .catch(err => {
            console.log(err);
        })
        this.componentDidUpdate();
    }

	componentDidMount() {
		console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE App.js <<<<<<------")
		this.getAllTravels();
	}

	render() {
		console.log("------>>>>>> I'M RUNNING render() FROM INSIDE App.js <<<<<<------")
		if (this.state.travels.length === 0) {
			console.log('from inside app.js/render(): still no travels in the state, lets call getAllTravels from render');
			this.getAllTravels();
			return <></>;
		}
		return (
			<div className="App">
				<Map countryCodes={this.state.countryCodes}/>
				<TravelList travels={this.state.travels} countryCodes={this.state.countryCodes}/>
				{/* <Route
					exact path='/travels/:id'
					component={TravelDetails}
        		/> */}
			</div>
		)
	}
}

export default App;