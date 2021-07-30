import React, { Component } from 'react';
import EditCountry from './EditCountry';

class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
			user: props.user,
			countries: props.getUserCountries(),
            details: false
        };
    }

    componentDidMount() {
        this.setState({
            countries: this.props.getUserCountries(),
            details: false
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                countries: this.props.countries
            })
        }
    }

    showDetails = () => {
        this.setState({
            details: !this.state.details
        })
    }

    render() {
        if (!this.state.countries) return <></>
        return (
            <div className="country-list">
                <div>
                    <p style={{color: '#137ff9'}}>Click on any country to open or close the edit mode</p>
                    <div><h5 style={{textDecoration: 'underline'}}>Already Visited:</h5>
                    {this.state.countries
                        .filter(country => country.visited)
                        .sort((a, b) => {
                            if (a.country.name < b.country.name) return -1;
                            return 1;
                        })
                        .map(country => {
                            return (
                                <div key={country._id} style={{width: "20vw"}}>
                                    <p onClick={this.showDetails}>{country.country.name} <img src={country.country.flag} alt={country.country.name} /></p>
                                    { this.state.details && 
                                        <EditCountry
                                            user={this.state.user}
                                            country={country}
                                            deleteCountry={this.props.deleteCountry}
                                            editCountry={this.props.editCountry}
                                            placeholder='How was it? How long did you stay? Any special memories?'
                                        />
                                    }
                                </div>
                            )
                        })
                    }
                    </div>
                    <div><h5 style={{textDecoration: 'underline'}}>Future trips:</h5>
                    {this.state.countries
                        .filter(country => !country.visited)
                        .sort((a, b) => {
                            if(a.country.name < b.country.name) { return -1; }
                            return 1
                        })
                        .map(country => {
                            return (
                                <div key={country._id} style={{width: "20vw"}}>
                                <p onClick={this.showDetails}>{country.country.name} <img src={country.country.flag} alt={country.country.name} /></p>
                                    { this.state.details && 
                                        <EditCountry
                                            user={this.state.user}
                                            country={country}
                                            deleteCountry={this.props.deleteCountry}
                                            editCountry={this.props.editCountry}
                                            placeholder='What are you plans?'
                                        />
                                    }
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
		)
	}
}

export default CountryList;