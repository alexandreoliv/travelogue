import React, { Component } from 'react';
import authService from "./auth-service";
import { Link } from 'react-router-dom';

class Signup extends Component {

	state = { username: '', password: '' }

	handleFormSubmit = (event) => {
		event.preventDefault();
		const {username, password} = this.state;
	   
		authService.signup(username, password)
		.then(createdUser => {
			this.setState({
				username: "",
				password: "",
			});
			// this.props.getUser(response, true);
			this.props.getUser(createdUser, true);
		})
		.catch(error => console.log(error))
	}
	   
	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleFormSubmit}>
				<label htmlFor="username">Username: </label>
				<input
					id="username"
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<label htmlFor="password">Password: </label>
				<input
					id="password"
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
		
				<button type="submit">Sign Up</button>
				</form>
		
				<p>
				Already have an account?
				<Link to={"/login"}>Log in</Link>
				</p>
		
			</div>
		)
	}
}

export default Signup;