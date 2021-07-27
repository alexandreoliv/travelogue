import React, { Component } from 'react';

class AddTravel extends Component {
    state = { 
        owner: "",
        country: "",
		countryCode: "",
		flag: "",
        city: "",
        date: "",
		visited: true
    }

	handleFormSubmit = (event) => {
		if (this.state.country) {
			console.log('this.state.country inside handleFormSubmit: ', this.state.country)
			console.log('this.props inside AddTravel.js/handleFormSubmit()', this.props)
			event.preventDefault();
			const country = this.state.country;
			const countryCode = this.state.countryCode;
			const flag = this.state.flag;
			const city = this.state.city;
			const date = this.state.date;
			const visited = this.state.visited;
			
			this.props.addTravel(country, countryCode, flag, city, date, visited);
			this.setState({ country: "", countryCode: "", flag: "", city: "", date: "", visited: true });
		}
	}
	
	handleChange = (event) => { 
		const {name, value} = event.target;
		console.log('type of event.target: ', event.target.name)
		this.setState({[name]: value});
		if (event.target.name === 'countryCode') {
			this.setState({
				country: this.props.countries.filter(country => country.alpha3Code === value).map(country => country.name)[0],
				flag: 'https://flagcdn.com/16x12/' + this.props.countries.filter(country => country.alpha3Code === value).map(country => country.alpha2Code)[0].toLowerCase() + '.png'
			})
		}
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
					<select name="countryCode" value={this.state.countryCode} onChange={ e => this.handleChange(e) }>
						<option></option>
						{this.props.countries.map(country => {
							return (
							<option key={country.alpha3Code} value={country.alpha3Code}>{country.name}</option>
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
				<div>
					<input type="radio" name="visited" value="true" checked onChange={ e => this.handleChange(e) } />
  					<label>Already visited</label>
					<input type="radio" name="visited" value="false" onChange={ e => this.handleChange(e) } />
  					<label>On my plan to visit</label>
				</div>
				<input type="submit" value="Submit" />
				</form>
		  	</div>
		)
	}
}

export default AddTravel;