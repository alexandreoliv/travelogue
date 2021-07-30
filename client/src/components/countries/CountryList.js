import React, { Component } from 'react';
import AddCountry from './AddCountry';
import EditCountry from './EditCountry';
import { Route, Switch } from 'react-router-dom';

class CountryList extends Component {
    constructor(props) {
        console.log("------>>>>>> I'M RUNNING constructor() FROM INSIDE CountryList.js <<<<<<------")
        console.log('props from inside CountryList.js/constructor', props)
        
        super(props);
        this.state = {
			user: props.user,
			countries: props.getUserCountries(),
        };
        console.log('info from CountryList.js/constructor: user = ', this.state.user)
        console.log('info from CountryList.js/constructor: countries = ', this.props.countries)
    }

    componentDidMount() {
        console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE CountryList.js <<<<<<------")
        console.log('this.props inside CountryList.js/componentDidMount(): ', this.props)
        this.setState({
            countries: this.props.getUserCountries()
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

    render() {
        if (!this.state.countries) {
            console.log('from inside CountryList.js/render(): STILL NO COUNTRIES IN THE STATE');
            return <></>
        }
        console.log("------>>>>>> I'M RUNNING render() FROM INSIDE CountryList.js <<<<<<------")
        return (
            <div className="country-list">
                <div>
                    <div><h5>Already Visited:</h5>
                    {this.state.countries.filter(country => country.visited).map(country => {
                        return (
                            <div key={country._id} style={{width: "20vw"}}>
                                <p>{country.country.name} <img src={country.country.flag} alt={country.country.name} /></p>
                                <EditCountry
                                    user={this.state.user}
                                    country={country}
                                    deleteCountry={this.props.deleteCountry}
                                    editCountry={this.props.editCountry}
                                    placeholder='How was it? How long did you stay? Any special memories?'
								/>
                            </div>
                        )
                    })}
                    </div>
                    <div><h5>Future trips:</h5>
                    {this.state.countries.filter(country => !country.visited).map(country => {
                        return (
                            <div key={country._id} style={{width: "20vw"}}>
                            <p>{country.country.name} <img src={country.country.flag} alt={country.country.name} /></p>
                                <EditCountry
                                    user={this.state.user}
                                    country={country}
                                    deleteCountry={this.props.deleteCountry}
                                    editCountry={this.props.editCountry}
                                    placeholder='What are you plans?'
								/>
                                {/* <p>Visited? {travel.visited? 'Yes' : 'No'}</p> */}
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div>
                    <Switch>
                        <Route
                            exact path='/countries/new'
                            component={AddCountry}
                        />
                        <Route
                            exact path='/countries/:id'
                            render={(matchProps) => 
                            <EditCountry
                                {...matchProps}
                                {...this.props} />
                            }
                            
                        />
                    </Switch>
                </div>
            </div>
		)
	}
}

export default CountryList;