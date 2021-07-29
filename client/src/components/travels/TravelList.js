import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddTravel from './AddTravel';
import EditTravel from './EditTravel';
import { Route, Switch } from 'react-router-dom';
import './TravelList.css';

class TravelList extends Component {
    constructor(props) {
        console.log("------>>>>>> I'M RUNNING constructor() FROM INSIDE TravelList.js <<<<<<------")
        console.log('props from inside TravelList.js/constructor', props)
        
        super(props);
        this.state = {
			user: props.user,
            // countryCodes: props.travels.filter(travel => (travel.owner === props.user._id) && travel.visited).map(travel => travel.country.code),
			// travels: props.travels
			travels: props.getUserTravels(),
			// visitedCodes: props.travels.filter(travel => (travel.owner === props.user._id) && travel.visited).map(travel => travel.country.code),
			// notVisitedCodes: props.travels.filter(travel => (travel.owner === props.user._id) && !travel.visited).map(travel => travel.country.code)
        };
        console.log('info from TravelList.js/constructor: user = ', this.state.user)
        console.log('info from TravelList.js/constructor: travels = ', this.props.travels)
    }

    // deleteTravel = (id) => {
    //     console.log("------>>>>>> I'M RUNNING deleteTravel() FROM INSIDE EditTravel.js <<<<<<------")
	// 	console.log("this is props inside EditTravel.js/deleteTravel: ", this.props)
    //     this.props.deleteTravel(id);
    // }

    componentDidMount() {
        console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE TravelList.js <<<<<<------")
        console.log('this.props inside TravelList.js/componentDidMount(): ', this.props)
        this.setState({
            travels: this.props.getUserTravels()
        })
    }

    componentDidUpdate(prevProps) {
        console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE TravelList.js <<<<<<------")
        if (prevProps !== this.props) {
            this.setState({
                travels: this.props.travels
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
        if (!this.state.travels) {
            console.log('from inside TravelList.js/render(): STILL NO TRAVELS IN THE STATE');
            return <></>
        }
        console.log("------>>>>>> I'M RUNNING render() FROM INSIDE TravelList.js <<<<<<------")
        return (
            <div className="travel-list">
                <div>
                    <div><h5>Already Visited:</h5>
                    {this.state.travels.filter(travel => travel.visited).map(travel => {
                        return (
                            <div key={travel._id} style={{width: "20vw"}}>
                                {/* <Link 
                                    key={travel._id}
                                    to={`/travels/${travel._id}`}>
                                    <p>{travel.country.name} <img src={travel.country.flag} alt={travel.country.name} /></p>
                                </Link> */}
                                <p>{travel.country.name} <img src={travel.country.flag} alt={travel.country.name} /></p>
                                <EditTravel
                                    user={this.state.user}
                                    travel={travel}
                                    deleteTravel={this.props.deleteTravel}
                                    editTravel={this.props.editTravel}
								/>
                            </div>
                        )
                    })}
                    </div>
                    <div><h5>Future trips:</h5>
                    {this.state.travels.filter(travel => !travel.visited).map(travel => {
                        return (
                            <div key={travel._id} style={{width: "20vw"}}>
                            <p>{travel.country.name} <img src={travel.country.flag} alt={travel.country.name} /></p>
                                <EditTravel
                                    user={this.state.user}
                                    travel={travel}
                                    deleteTravel={this.props.deleteTravel}
                                    editTravel={this.props.editTravel}
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
                            exact path='/travels/new'
                            component={AddTravel}
                        />
                        <Route
                            exact path='/travels/:id'
                            render={(matchProps) => 
                            <EditTravel
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

export default TravelList;