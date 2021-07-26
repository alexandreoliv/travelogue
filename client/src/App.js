import React, { Component } from 'react';
import './App.css';
import TravelList from './components/travels/TravelList';
// import TravelDetails from './components/travels/TravelDetails';
// import { Route } from 'react-router-dom';
import axios from 'axios';
import Map from './components/Map';
import AddTravel from './components/travels/AddTravel';

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
            // countryCodes: []
    };

	getAllTravels = () => {
		console.log("------>>>>>> I'M RUNNING getAllTravels() FROM INSIDE App.js <<<<<<------")
        axios.get('http://localhost:5005/api/travels')
        .then (response => {
            this.setState({
                travels: response.data,
				// countryCodes: response.data.map(country => country.countryCode)
            })
			if (this.state.travels.length === 0) return 0;
            console.log('travels from inside app.js/getAllTravels: ', this.state.travels);
			// console.log('countryCodes from inside app.js/getAllTravels: ', this.state.countryCodes);
        })
        .catch(err => console.log(err));
    }

	addTravel = (country, countryCode, city, date, transportation, picture) => {
        console.log("------>>>>>> I'M RUNNING addTravel() FROM INSIDE App.js <<<<<<------")
		console.log("this is props inside App.js/addTravel: ", this.props)
        axios({
			method: 'post',
			url: `http://localhost:5005/api/travels`,
			data: {
				country,
				countryCode,
				city,
				date,
				transportation,
				picture
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
        // .delete(`http://localhost:5005/api/travels/${travelId}`)
		.delete(`http://localhost:5005/api/travels/${id}`)
        .then(resp => {
            console.log('resp from axios from inside App.js/deleteTravel: ', resp);
			// code below doesn't work because it doesn't update this.state.countryCodes
            this.setState({
                travels: this.state.travels.filter(travel => travel._id !== resp.data._id)
            })
			console.log('this.state.travels from inside App.js/deleteTravel() right after a travel was deleted')
        })
        .catch(err => {
            console.log(err);
        })
        // this.componentDidUpdate();
    }

	componentDidMount() {
		console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE App.js <<<<<<------")
		this.getAllTravels();
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
				/>
				<TravelList
					travels={this.state.travels}
					// countryCodes={this.state.countryCodes}
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