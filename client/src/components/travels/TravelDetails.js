import React, { Component } from 'react';
import axios from 'axios';

class TravelDetails extends Component {
    state = { 
        travel: null
    }
    
    getTravel = () => {
        console.log('this is this.props.match.params.id: ', this.props.match.params.id)
        const travelId = this.props.match.params.id;
        axios
        .get(`http://localhost:5005/api/travels/${travelId}`)
        .then(resp => {
            console.log('resp from axios: ', resp);
            this.setState({
                travel: resp.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    deleteTravel = () => {
        console.log('this is this.props.match.params.id: ', this.props.match.params.id)
        const travelId = this.props.match.params.id;
        axios
        .delete(`http://localhost:5005/api/travels/${travelId}`)
        .then(resp => {
            console.log('resp from axios: ', resp);
            this.setState({
                travel: resp.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    componentDidMount(){
        this.getTravel();
    }

    render() {
        const { travel } = this.state;
        console.log('this.state.travel inside the render: ', travel)
        if (!travel) return <></>;
        return (
			<div>
                <div key={travel._id} style={{border: "1px solid black", width: "50vw"}}>
                    <p>Country: {travel.country}</p>
                    <p>City: {travel.city}</p>
                    <p>Year: {travel.date}</p>
                    {/* <p>{travel.transportation}</p> */}
                    <img src={travel.picture} alt={travel.city} height="250px" />
                    <button type="submit">Edit</button>
                    <button type="submit" onClick={this.deleteTravel}>Delete</button>
                </div>
		    </div>
		)
	}
}

export default TravelDetails;