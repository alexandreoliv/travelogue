import React, { Component } from 'react';
// import axios from 'axios';

class TravelDetails extends Component {
    // state = { 
    //     travel: null
    // }
    
    // getTravel = () => {
    //     console.log("------>>>>>> I'M RUNNING getTravel() FROM INSIDE TravelDetails.js <<<<<<------")
    //     console.log('this is this.props.match.params.id from inside TravelDetails/getTravel: ', this.props.match.params.id)
    //     const travelId = this.props.match.params.id;
    //     axios
    //     .get(`http://localhost:5005/api/travels/${travelId}`)
    //     .then(resp => {
    //         console.log('resp from axios from inside TravelDetails/getTravel: ', resp);
    //         this.setState({
    //             travel: resp.data
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

    // componentDidMount() {
    //     console.log("------>>>>>> I'M RUNNING componentDidMount() FROM INSIDE TravelDetails.js <<<<<<------")
    //     // this.props.getTravel();
    //     console.log('this.props inside TravelDetails.js/componentDidMount(): ', this.props)
    // }

    // componentDidUpdate(prevProps) {
    //     console.log("------>>>>>> I'M RUNNING componentDidUpdate() FROM INSIDE TravelDetails.js <<<<<<------")
    //     // if (prevProps !== this.props)
    //     //     this.props.getTravel();
    // }

    deleteTravel = (id) => {
        console.log("------>>>>>> I'M RUNNING deleteTravel() FROM INSIDE TravelDetails.js <<<<<<------")
		console.log("this is props inside TravelDetails.js/deleteTravel: ", this.props)
        this.props.deleteTravel(id);
    }

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
                        <p>Date: {travel[0].date}</p>
                        <p>Visited? {travel[0].visited}</p>
                        <button >Edit</button>
                        <button onClick={ () => this.props.deleteTravel(`${travel[0]._id}`) }>Delete</button>
                    </div>
                </div>
            )
        } else return <></>
	}
}

export default TravelDetails;