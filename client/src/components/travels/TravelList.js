import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TravelList extends Component {
    state = { 
        travels: []
    }
    
    componentDidMount() {
        axios.get('http://localhost:5005/travels')
        .then (resp => {
            this.setState({
                travels: resp.data
            })
            console.log(this.state.travels)
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
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
		)
	}
}

export default TravelList;