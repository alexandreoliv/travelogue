import React, { Component } from 'react';
import './AddCountry.css';

class AddCountry extends Component {
    state = { 
        owner: "",
        country: {
			name: "",
			code: "",
			flag: ""
		},
        city: "",
        details: "",
		visited: ""
    }

	handleFormSubmit = (event) => {
		if (this.state.country.code) {
			event.preventDefault();
			const country = {
				name: this.state.country.name,
				code: this.state.country.code,
				flag: this.state.country.flag
			};
			const city = this.state.city;
			const details = this.state.details;
			const visited = this.state.visited;
			const owner = this.props.user._id;
			
			this.props.addCountry(country, city, details, visited, owner);
			this.setState({ country: { name: "", code: "", flag: "" }, city: "", details: "", visited: "" });
		}
	}
	
	handleChange = (event) => { 
		const {name, value} = event.target;
		if (event.target.name === 'code') {
			this.setState({
				country: {
					code: value,
					name: this.props.allCountries.filter(country => country.alpha3Code === value).map(country => country.name)[0],
					flag: 'https://flagcdn.com/16x12/' + this.props.allCountries.filter(country => country.alpha3Code === value).map(country => country.alpha2Code)[0].toLowerCase() + '.png'
				}
			})
		} else this.setState({[name]: value});
	}

	render() {
        return (
			<div className="add-country">
				<form onSubmit={this.handleFormSubmit}>
				<div>
					<label>Country <span style={{color: 'red'}}>*</span></label>
					<select name="code" value={this.state.country.code} required onChange={ e => this.handleChange(e) }>
						<option></option>
						{this.props.allCountries.map(country => {
							return (
							<option key={country.alpha3Code} value={country.alpha3Code}>{country.name}</option>
							)
						})}
					</select>
				</div>
				<div>
					<label>Cities <span style={{color: 'red'}}>*</span></label>
					<textarea name="city" cols="40" value={this.state.city} required onChange={ e => this.handleChange(e) } />
				</div>
				<div>
					<label>Details: </label>
					<textarea name="details" rows="4" cols="40" value={this.state.details} placeholder='How was it? How long did you stay? Any special memories? Or what are your plans for your future trip?' onChange={ e => this.handleChange(e) } />
				</div>
				<div className="radio">
					<div>
						<input type="radio" id="visited" name="visited" value="true" required onChange={ e => this.handleChange(e) } />
						<label htmlFor="visited">Already visited</label>
					</div>
					<div>
						<input type="radio" id="planned" name="visited" value="false" onChange={ e => this.handleChange(e) } />
						<label htmlFor="planned">Future trip <span style={{color: 'red'}}>*</span></label>
					</div>
				</div>
				<div className="div-btn">
					<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
					<button type="submit" className="btn btn-primary">Save country</button>
				</div>
				</form>
		  	</div>
		)
	}
}

export default AddCountry;