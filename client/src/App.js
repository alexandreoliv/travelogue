import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import authService from './components/auth/auth-service';
import Navbar from './components/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import TravelList from './components/travels/TravelList';
import AddTravel from './components/travels/AddTravel';
import TravelDetails from './components/travels/TravelDetails';
import ProtectedRoute from './components/auth/ProtectedRoute';

class App extends Component {
	state = {
		isLoggedIn: false,
		user: null,
		travels: [],
		countries: []
    };

	getTheUser = (userObj, loggedIn) => {
		this.setState({
			user: userObj,
			isLoggedIn: loggedIn
		});
	};

	fetchUser = () => {
		if (this.state.user === null) {
			authService
				.loggedin()
				.then(data => {
					this.setState({
						user: data,
						isLoggedIn: true
					});
				})
				.catch(err => {
					this.setState({
						user: null,
						isLoggedIn: false
					});
				});
		}
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
        axios.get('http://localhost:5000/api/travels', {withCredentials: true})
        .then (response => {
            this.setState({
                travels: response.data,
            })
			if (this.state.travels.length === 0) return 0;
            console.log('travels from inside app.js/getAllTravels: ', this.state.travels);
        })
        .catch(err => console.log(err));
    }

	getUserTravels = () => {
		console.log("------>>>>>> I'M RUNNING getUserTravels() FROM INSIDE App.js <<<<<<------")
		console.log('this.state.user.user_id from inside App.js/getUserTravels: ', this.state.user)
        axios.get('http://localhost:5000/api/travels/user', { withCredentials: true })
        .then (response => {
            this.setState({
                travels: response.data,
            })
			if (this.state.travels.length === 0) return 0;
            console.log('travels from inside app.js/getUserTravels: ', this.state.travels);
        })
        .catch(err => console.log(err));
    }

	addTravel = (country, city, details, visited) => {
        console.log("------>>>>>> I'M RUNNING addTravel() FROM INSIDE App.js <<<<<<------")
		console.log("this is props inside App.js/addTravel: ", this.props)
        // axios({
		// 	method: 'post',
		// 	url: 'http://localhost:5000/api/travels',
		// 	data: {
		// 		country,
		// 		city,
		// 		details,
		// 		visited
		// 	},
		// 	withCredentials: true
		// })
		axios
			.post('http://localhost:5000/api/travels', { country, city, details, visited }, { withCredentials: true })			
			.then(resp => {
				console.log('resp from axios from inside App.js/addTravel: ', resp);
				this.getUserTravels();
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
		.delete(`http://localhost:5000/api/travels/${id}`, { withCredentials: true })
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
		this.fetchUser();
		// this.getUserTravels();
		this.getAllCountries();
	}

	componentDidUpdate(prevProps) {
		console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE App.js <<<<<<------")
		if (prevProps !== this.props) {
			this.fetchUser();
			// this.getUserTravels();
		}
	}

	render() {
		console.log("------>>>>>> I'M RUNNING render() FROM INSIDE App.js <<<<<<------")
		// if (this.state.travels.length === 0) {
		// 	console.log('from inside app.js/render(): still no travels in the state, lets call getUserTravels from render');
		// 	return <></>;
		// }
		return (
			<div className="App">
				<Navbar
					userData={this.state.user}
					userIsLoggedIn={this.state.isLoggedIn}
					getUser={this.getTheUser}
					travels={this.state.travels}
					getUserTravels={this.getUserTravels}
					countries={this.state.countries}
					addTravel={this.addTravel}
				/>
				<Switch>
					<Route exact path="/login" render={props => <Login {...props} getUser={this.getTheUser} />} />
					<Route exact path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
					<ProtectedRoute exact path="/travels"
						component={TravelList}
						travels={this.state.travels}
						getUserTravels={this.getUserTravels}
						deleteTravel={this.deleteTravel}
					/>
					<ProtectedRoute exact path="/travels/:id" render={props => <TravelDetails {...props} user={this.state.user} />} />
					<Route exact path="/travels/new"
						component={AddTravel}
						addTravel={this.addTravel}
						countries={this.state.countries}
					/>
				</Switch>
				{/* <Map user={this.state.user} travels={this.state.travels} /> */}
				{/* <AddTravel 
					addTravel={this.addTravel}
					countries={this.state.countries}
				/>
				<TravelList
					travels={this.state.travels}
					getAllTravels={this.getAllTravels}
					deleteTravel={this.deleteTravel}
				/> */}
			</div>
		)
	}
}

export default App;