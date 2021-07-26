import React, { Component } from 'react';

class AddTravel extends Component {
    state = { 
        owner: "",
        country: "",
		countryCode: "",
        city: "",
        date: ""
    }

	handleFormSubmit = (event) => {
		console.log('this.props inside AddTravel.js/handleFormSubmit()', this.props)
		event.preventDefault();
		const country = this.state.country;
		const countryCode = this.state.countryCode;
		const city = this.state.city;
		const date = this.state.date;

		this.props.addTravel(country, countryCode, city, date);
		this.setState({ country: "", countryCode: "", city: "", date: "" });
	}
	
	handleChange = (event) => {  
		const {name, value} = event.target;
		this.setState({[name]: value});
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
					<input type="text" name="country" value={this.state.country} onChange={ e => this.handleChange(e) }/>
				</div>
				<div>
					<label>Country code: </label>
					<input type="text" name="countryCode" value={this.state.countryCode} onChange={ e => this.handleChange(e) }/>
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