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
        axios.get('https://restcountries.com/v2/all')
        .then (response => {
            this.setState({
                allCountries: response.data
            })
        })
        .catch(err => console.log(err));
    }

	getUserCountries = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/countries/user`, { withCredentials: true })
        .then (response => {
            this.setState({
                countries: response.data,
            })
			if (this.state.countries.length === 0) return 0;
        })
        .catch(err => console.log(err));
    }

	addCountry = (country, city, details, visited) => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/countries`, { country, city, details, visited }, { withCredentials: true })			
			.then(resp => {
				this.getUserCountries();
			})
			.catch(err => {
				console.log(err);
        })
    }

	editCountry = (id, city, details, visited) => {
        axios
			.put(`${process.env.REACT_APP_API_URL}/countries`, { id, city, details, visited }, { withCredentials: true })			
			.then(resp => {
				this.getUserCountries();
			})
			.catch(err => {
				console.log(err);
        })
    }

	deleteCountry = (id) => {
        axios
		.delete(`${process.env.REACT_APP_API_URL}/countries/${id}`, { withCredentials: true })
        .then(resp => {
            this.setState({
                countries: this.state.countries.filter(country => country._id !== resp.data._id)
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

	componentDidMount() {
		this.fetchUser();
		this.getAllCountries();
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.fetchUser();
		}
	}

	render() {
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