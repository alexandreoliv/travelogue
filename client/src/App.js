import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import authService from './components/auth/auth-service';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

class App extends Component {
	state = {
		isLoggedIn: false,
		user: null,
		countries: [],
		allCountries: []
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
                allCountries: response.data
            })
            console.log('allCountries from inside app.js/getAllCountries: ', this.state.allCountries);
        })
        .catch(err => console.log(err));
    }

	getAllUserCountries = () => {
		console.log("------>>>>>> I'M RUNNING getAllUserCountries() FROM INSIDE App.js <<<<<<------")
        axios.get('http://localhost:5000/api/countries', {withCredentials: true})
        .then (response => {
            this.setState({
                countries: response.data,
            })
			if (this.state.countries.length === 0) return 0;
            console.log('countries from inside app.js/getAllUserCountries: ', this.state.countries);
        })
        .catch(err => console.log(err));
    }

	getUserCountries = () => {
		console.log("------>>>>>> I'M RUNNING getUserCountries() FROM INSIDE App.js <<<<<<------")
		console.log('this.state.user from inside App.js/getUserCountries: ', this.state.user)
        axios.get('http://localhost:5000/api/countries/user', { withCredentials: true })
        .then (response => {
            this.setState({
                countries: response.data,
            })
			if (this.state.countries.length === 0) return 0;
            console.log('countries from inside app.js/getUserCountries: ', this.state.countries);
        })
        .catch(err => console.log(err));
    }

	addCountry = (country, city, details, visited) => {
        console.log("------>>>>>> I'M RUNNING addCountry() FROM INSIDE App.js <<<<<<------")
		console.log("this is props inside App.js/addCountry: ", this.props)
		axios
			.post('http://localhost:5000/api/countries', { country, city, details, visited }, { withCredentials: true })			
			.then(resp => {
				console.log('resp from axios from inside App.js/addCountry: ', resp);
				this.getUserCountries();
			})
			.catch(err => {
				console.log(err);
        })
    }

	editCountry = (id, city, details, visited) => {
        console.log("------>>>>>> I'M RUNNING editCountry() FROM INSIDE App.js <<<<<<------")
		console.log("this is props inside App.js/editCountry: ", this.props)
        axios
			.put('http://localhost:5000/api/countries', { id, city, details, visited }, { withCredentials: true })			
			.then(resp => {
				console.log('resp from axios from inside App.js/editCountry: ', resp);
				this.getUserCountries();
			})
			.catch(err => {
				console.log(err);
        })
    }

	deleteCountry = (id) => {
        console.log("------>>>>>> I'M RUNNING deleteCountry() FROM INSIDE App.js <<<<<<------")
		console.log("this is props inside App.js/deleteCountry: ", this.props)
        axios
		.delete(`http://localhost:5000/api/countries/${id}`, { withCredentials: true })
        .then(resp => {
            console.log('resp from axios from inside App.js/deleteCountry: ', resp);
            this.setState({
                countries: this.state.countries.filter(country => country._id !== resp.data._id)
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

	componentDidMount() {
		console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE App.js <<<<<<------")
		this.fetchUser();
		this.getAllCountries();
	}

	componentDidUpdate(prevProps) {
		console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE App.js <<<<<<------")
		if (prevProps !== this.props) {
			this.fetchUser();
		}
	}

	render() {
		console.log("------>>>>>> I'M RUNNING render() FROM INSIDE App.js <<<<<<------")
		return (
			<div className="App">
				<Home
					userData={this.state.user}
					userIsLoggedIn={this.state.isLoggedIn}
					getUser={this.getTheUser}
					countries={this.state.countries}
					getUserCountries={this.getUserCountries}
					allCountries={this.state.allCountries}
					addCountry={this.addCountry}
					deleteCountry={this.deleteCountry}
					editCountry={this.editCountry}
					getTheUser={this.getTheUser}
				/>
				<Switch>
					<Route exact path="/login" render={props => <Login {...props} getUser={this.getTheUser} />} />
					<Route exact path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
				</Switch>
			</div>
		)
	}
}

export default App;