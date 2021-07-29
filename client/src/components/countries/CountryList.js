import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddCountry from './AddCountry';
import EditCountry from './EditCountry';
import { Route, Switch } from 'react-router-dom';
import './CountryList.css';

class CountryList extends Component {
    constructor(props) {
        console.log("------>>>>>> I'M RUNNING constructor() FROM INSIDE CountryList.js <<<<<<------")
        console.log('props from inside CountryList.js/constructor', props)
        
        super(props);
        this.state = {
			user: props.user,
            // countryCodes: props.travels.filter(travel => (travel.owner === props.user._id) && travel.visited).map(travel => travel.country.code),
			// travels: props.travels
			countries: props.getUserCountries(),
			// visitedCodes: props.travels.filter(travel => (travel.owner === props.user._id) && travel.visited).map(travel => travel.country.code),
			// notVisitedCodes: props.travels.filter(travel => (travel.owner === props.user._id) && !travel.visited).map(travel => travel.country.code)
        };
        console.log('info from CountryList.js/constructor: user = ', this.state.user)
        console.log('info from CountryList.js/constructor: countries = ', this.props.countries)
    }

    // deleteTravel = (id) => {
    //     console.log("------>>>>>> I'M RUNNING deleteTravel() FROM INSIDE EditTravel.js <<<<<<------")
	// 	console.log("this is props inside EditTravel.js/deleteTravel: ", this.props)
    //     this.props.deleteTravel(id);
    // }

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

    // setVisibility() {
    //     const city = document.getElementById('city');
    //     console.log(city);
    //     if (city.style.visibility === 'hidden')
    //         city.style.visibility = 'visible';
    //     else
    //         city.style.visibility = 'hidden';
    // }

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
                                {/* <Link 
                                    key={travel._id}
                                    to={`/travels/${travel._id}`}>
                                    <p>{travel.country.name} <img src={travel.country.flag} alt={travel.country.name} /></p>
                                </Link> */}
                                <p>{country.country.name} <img src={country.country.flag} alt={country.country.name} /></p>
                                <EditCountry
                                    user={this.state.user}
                                    country={country}
                                    deleteCountry={this.props.deleteCountry}
                                    editCountry={this.props.editCountry}
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
                            {/* <TravelDetails travels={this.props.travels} /> */}
                        {/* </Route> */}
                    </Switch>
                    {/* <Route
                        exact path='/travels/:id'
                        component={TravelDetails}
                    /> */}
                </div>
                {/* <div style={{width: '40%', float:"right"}}> */}
            </div>
		)
	}
}

export default CountryList;