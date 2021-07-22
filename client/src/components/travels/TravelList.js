import React, { Component } from 'react';
import axios from 'axios';

class TravelList extends Component {
    state = { 
        travels: []
    }
    
    componentDidMount(){
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
                        <p>Country: {travel.country}</p>
                        <p>City: {travel.city}</p>
                        <p>Date: {travel.date}</p>
                        {/* <p>{travel.transportation}</p> */}
                        <img src={travel.picture} alt={travel.city} height="250px" />
                    </div>
                )
            })}
		    </div>
		)
	}
}

export default TravelList;