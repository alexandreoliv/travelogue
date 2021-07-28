import React, { Component } from 'react';
// import axios from 'axios';

class TravelDetails extends Component {
    deleteTravel = (id) => {
        console.log("------>>>>>> I'M RUNNING deleteTravel() FROM INSIDE TravelDetails.js <<<<<<------")
		console.log("this is props inside TravelDetails.js/deleteTravel: ", this.props)
        this.props.deleteTravel(id);
    }

    ownershipCheck = (project, travel) => {
        const currentUserIsOwner = this.props.user && (project.owner === this.props.user._id);
        if (currentUserIsOwner) {
            return (
                <div>
                    <button onClick={ () => this.props.deleteTravel(`${travel[0]._id}`) }>Delete</button>
                </div>
            );
        }
    };

    render() {
        console.log("------>>>>>> I'M RUNNING render() FROM INSIDE TravelDetails.js <<<<<<------")
        console.log('this.props inside TravelDetails.js/render(): ', this.props)
        const { travels } = this.props;
        
        // if (!travels) return <></>;
        // if (this.state.travel === null) return <></>;
        console.log('this.state.travels from inside TravelDetails/render: ', travels)
        const travel = travels.filter(travel => travel._id === this.props.match.params.id);
        console.log('this is the travel we are going to work with: ', travel);
        if (travel.length > 0) {
            return (
                <div>
                    <div key={travel[0]._id} style={{border: "1px solid black", width: "50vw"}}>
                        <p>Country: {travel[0].country.name}</p>
                        <p>Country code: {travel[0].country.code}</p>
                        <p>City: {travel[0].city}</p>
                        <p>Details: {travel[0].details}</p>
                        <p>Visited? {travel[0].visited}</p>
                        <button >Edit</button>
                        <div> {this.ownershipCheck(this.state)} </div>
                        <button onClick={ () => this.props.deleteTravel(`${travel[0]._id}`) }>Delete</button>
                    </div>
                </div>
            )
        } else return <></>
	}
}

export default TravelDetails;