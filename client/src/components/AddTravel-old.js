import React, { Component } from 'react';
import axios from 'axios';

class AddTravel extends Component {
    state = { 
        owner: "",
        country: "",
		countryCode: "",
        city: "",
        date: "",
    }

	handleFormSubmit = (event) => {
		event.preventDefault();
		const country = this.state.country;
		const countryCode = this.state.countryCode;
		const city = this.state.city;
		const date = this.state.date;

		axios
			.post('http://localhost:5005/api/travels', { country, countryCode, city, date })
			.then( () => {
				// this.props.getData();
				this.setState({ country: "", countryCode: "", city: "", date: "" });
			})
			.catch( error => console.log(error) )
	}
	
	handleChange = (event) => {  
		const {name, value} = event.target;
		this.setState({[name]: value});
	}
 
	componentDidUpdate(prevProps) {
		console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE AddTravel.js <<<<<<------")
    }

	render() {
		console.log("------>>>>>> I'M RUNNING render() FROM INSIDE AddTravel.js <<<<<<------")
        return (
			<div>
				<form onSubmit={this.handleFormSubmit}>
				<div>
					<label>Country: </label>
					<input type="text" name="country" onChange={ e => this.handleChange(e) }/>
				</div>
				<div>
					<label>Country code: </label>
					<input type="text" name="countryCode" onChange={ e => this.handleChange(e) }/>
				</div>
				<div>
					<label>City: </label>
					<textarea name="city" onChange={ e => this.handleChange(e) } />
				</div>
				<div>
					<label>Date: </label>
					<textarea name="date" onChange={ e => this.handleChange(e) } />
				</div>
				
				<input type="submit" value="Submit" />
				</form>
		  </div>
		)
	}
}

export default AddTravel;