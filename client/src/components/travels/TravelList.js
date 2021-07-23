import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddTravel from './AddTravel';

class TravelList extends Component {
    state = { 
        travels: []
    }
    
    getAllTravels = () => {
        axios.get('http://localhost:5005/api/travels')
        .then (resp => {
            this.setState({
                travels: resp.data
            })
            console.log(this.state.travels)
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getAllTravels();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props)
            this.getAllTravels();
    }

    render() {
        return (
            <div>
                <div>
                {this.state.travels.map(travel => {
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
                <div style={{width: '40%', float:"right"}}>
                    <AddTravel getData={() => this.getAllTravels()}/> {/* <== !!! */}
                </div>
            </div>
		)
	}
}

export default TravelList;