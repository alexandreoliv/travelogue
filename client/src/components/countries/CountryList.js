import React, { Component } from 'react';
import EditCountry from './EditCountry';

class CountryList extends Component {
    constructor(props) {
        console.log("------>>>>>> I'M RUNNING constructor() FROM INSIDE CountryList.js <<<<<<------")
        console.log('props from inside CountryList.js/constructor', props)
        
        super(props);
        this.state = {
			user: props.user,
			countries: props.getUserCountries(),
            details: false
        };
        console.log('info from CountryList.js/constructor: user = ', this.state.user)
        console.log('info from CountryList.js/constructor: countries = ', this.props.countries)
    }

    componentDidMount() {
        console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE CountryList.js <<<<<<------")
        console.log('this.props inside CountryList.js/componentDidMount(): ', this.props)
        this.setState({
            countries: this.props.getUserCountries(),
            details: false
        })
    }

    componentDidUpdate(prevProps) {
        console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE CountryList.js <<<<<<------")
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
        if (!this.state.countries) {
            console.log('from inside CountryList.js/render(): STILL NO COUNTRIES IN THE STATE');
            return <></>
        }
        console.log("------>>>>>> I'M RUNNING render() FROM INSIDE CountryList.js <<<<<<------")
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