import React, { Component } from 'react';

class AddTravel extends Component {
    state = { 
        owner: "",
        country: "",
		countryCode: "",
        city: "",
        date: "",
        transportation: {
            in: "",
            out: ""
        },
        picture: ""
    }

	handleFormSubmit = (event) => {
		console.log('this.props inside AddTravel.js/handleFormSubmit()', this.props)
		event.preventDefault();
		const country = this.state.country;
		const countryCode = this.state.countryCode;
		const city = this.state.city;
		const date = this.state.date;
		const transportation = this.state.transportation;
		const picture = this.state.picture;

		this.props.addTravel(country, countryCode, city, date, transportation, picture);
		this.setState({ country: "", countryCode: "", city: "", date: "", transportation: {	in: "",	out: ""	},	picture: "" });
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
				<div>
					<label>Transportation: </label>
					<textarea name="transportation" value={this.state.transportation} onChange={ e => this.handleChange(e) } />
				</div>
				<div>
					<label>Picture: </label>
					<textarea name="picture" value={this.state.picture} onChange={ e => this.handleChange(e) } />
				</div>
				
				<input type="submit" value="Submit" />
				</form>
		  </div>
		)
	}
}

export default AddTravel;