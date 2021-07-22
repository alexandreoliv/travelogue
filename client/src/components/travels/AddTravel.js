import React, { Component } from 'react';
import axios from 'axios';

class AddTravel extends Component {
    state = { 
        owner: "",
        country: "",
        city: "",
        date: "",
        transportation: {
            in: "",
            out: ""
        },
        picture: ""
    }

	handleFormSubmit = (event) => {
		event.preventDefault();
		const country = this.state.country;
		const city = this.state.city;
		const date = this.state.date;
		const transportation = this.state.transportation;
		const picture = this.state.picture;

		axios
			.post('http://localhost:5005/travels', { country, city, date, transportation, picture })
			.then( () => {
				// this.props.getData();
				this.setState({ country: "", city: "", date: "", transportation: {	in: "",	out: ""	},	picture: "" });
			})
			.catch( error => console.log(error) )
	}
	
	handleChange = (event) => {  
		const {name, value} = event.target;
		this.setState({[name]: value});
	}
 
    render() {
        return (
			<div>
				<form onSubmit={this.handleFormSubmit}>
				<label>Country:</label>
				<input type="text" name="country" value={this.state.country} onChange={ e => this.handleChange(e)}/>
				<label>City:</label>
				<textarea name="city" value={this.state.city} onChange={ e => this.handleChange(e)} />
				<label>Date:</label>
				<textarea name="date" value={this.state.date} onChange={ e => this.handleChange(e)} />
				<label>Transportation:</label>
				<textarea name="transportation" value={this.state.transportation} onChange={ e => this.handleChange(e)} />
				<label>Picture:</label>
				<textarea name="picture" value={this.state.picture} onChange={ e => this.handleChange(e)} />
				
				<input type="submit" value="Submit" />
				</form>
		  </div>
		)
	}
}

export default AddTravel;