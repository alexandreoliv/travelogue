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
		if (this.state.country) {
			console.log('this.state.country inside handleFormSubmit: ', this.state.country)
			console.log('this.props inside AddTravel.js/handleFormSubmit()', this.props)
			event.preventDefault();
			const country = this.state.country;
			const countryCode = this.state.countryCode;
			const city = this.state.city;
			const date = this.state.date;

			this.props.addTravel(country, countryCode, city, date);
			this.setState({ country: "", countryCode: "", city: "", date: "" });
		}
	}
	
	handleChange = (event) => {  
		const {name, value} = event.target;
		console.log('type of event.target: ', event.target.name)
		this.setState({[name]: value});
		if (event.target.name === 'country') {
			this.getCountryCode(value);
		}
	}

	getCountryCode = (country) => {
		console.log("------>>>>>> I'M RUNNING getCountryCode() FROM INSIDE AddTravel.js <<<<<<------")
        axios
			.get(`https://restcountries.eu/rest/v2/name/${country}`)
        	.then (response => {
				console.log('axios response from getCountryCode: ', response.data[0].alpha3Code)
            	this.setState({
                	countryCode: response.data[0].alpha3Code
            	})
        	})
        	.catch(err => console.log(err));
    }

	componentDidUpdate(prevProps) {
		console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE AddTravel.js <<<<<<------")
		console.log('prevProps from inside AddTravel.js/componentDidUpdate: ', prevProps);
		console.log('this.props from inside AddTravel.js/componentDidUpdate: ', this.props);
    }

	render() {
		console.log("------>>>>>> I'M RUNNING render() FROM INSIDE AddTravel.js <<<<<<------")
        return (
			<div>
				<form onSubmit={this.handleFormSubmit}>
				<div>
					<label>Country: </label>
					<select name="country" value={this.state.country} onChange={ e => this.handleChange(e) }>
						<option></option>
						{this.props.countries.map(country => {
							return (
							<option key={country.alpha3Code} value={country.name}>{country.name}</option>
							)
						})}
					</select>
				</div>
				<div>
					<label>City: </label>
					<textarea name="city" value={this.state.city} onChange={ e => this.handleChange(e) } />
				</div>
				<div>
					<label>Date: </label>
					<textarea name="date" value={this.state.date} onChange={ e => this.handleChange(e) } />
				</div>
				<input type="submit" value="Submit" />
				</form>
		  	</div>
		)
	}
}

export default AddTravel;