import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddTravel from './AddTravel';
import TravelDetails from './TravelDetails';
import { Route, Switch } from 'react-router-dom';

class TravelList extends Component {
    // state = { 
    //     travels: []
    // }
    
    componentDidMount() {
        console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE TravelList.js <<<<<<------")
        console.log('this.props inside TravelList.js/componentDidMount(): ', this.props)
        // this.getAllTravels();
        // this.setState({
        //     travels: props.travels
        // })
    }

    componentDidUpdate(prevProps) {
        console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE TravelList.js <<<<<<------")
        // if (prevProps !== this.props)
        //     this.getAllTravels();
    }

    deleteTravel = (id) => {
        this.props.deleteTravel(id)
    }

    render() {
        console.log("------>>>>>> I'M RUNNING render() FROM INSIDE TravelList.js <<<<<<------")
        return (
            <div className="travel-list">
                <div>
                    {/* <div> */}
                        {/* <AddTravel getData={() => this.getAllTravels()}/> */}
                        {/* <a href="/travels/new">
                            <button type="submit">Add new travel</button>
                        </a> */}
                    {/* </div> */}
                    <div>
                    {this.props.travels.map(travel => {
                        return (
                            <div key={travel._id} style={{border: "1px solid black", width: "50vw"}}>
                                <Link 
                                    key={travel._id}
                                    to={`/travels/${travel._id}`}>
                                    <h3>{travel.country} / {travel.city}</h3>
                                </Link>
                                <p>Date: {travel.date}</p>
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
                            <TravelDetails
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