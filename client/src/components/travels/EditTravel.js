import React, { Component } from 'react';
import './AddTravel.css';

class EditTravel extends Component {
    state = { 
        city: this.props.travel.city,
        details: this.props.travel.details,
		visited: this.props.travel.visited
    }

    deleteTravel = (id) => {
        console.log("------>>>>>> I'M RUNNING deleteTravel() FROM INSIDE EditTravel.js <<<<<<------")
		console.log("this is props inside EditTravel.js/deleteTravel: ", this.props)
        this.props.deleteTravel(id);
    }

    editTravel = (id, city, details, visited) => {
        console.log("------>>>>>> I'M RUNNING editTravel() FROM INSIDE EditTravel.js <<<<<<------")
		console.log("this is props inside EditTravel.js/editTravel: ", this.props)
        this.props.editTravel(id, city, details, visited);
    }

    handleFormSubmit = (event) => {
        const city = this.state.city;
        const details = this.state.details;
        const visited = this.state.visited;
        const id = this.props.travel._id;
        console.log('alex, this.props.user._id is: ', this.props.user._id)
        
        this.editTravel(id, city, details, visited);
        // this.setState({ city: "", details: "", visited: "" });
	}
	
	handleChange = (event) => { 
		const {name, value} = event.target;
		console.log('name of event.target: ', event.target.name)
		this.setState({[name]: value});
	}

    ownershipCheck = (project, travel) => {
        // const currentUserIsOwner = this.props.user && (project.owner === this.props.user._id);
        // if (currentUserIsOwner) {
        //     return (
        //         <div>
        //             <button onClick={ () => this.props.deleteTravel(`${travel[0]._id}`) }>Delete</button>
        //         </div>
        //     );
        // }
    };

    render() {
        console.log("------>>>>>> I'M RUNNING render() FROM INSIDE EditTravel.js <<<<<<------")
        console.log('this.props inside EditTravel.js/render(): ', this.props)
        const { travel } = this.props;
        
        // if (!travels) return <></>;
        // if (this.state.travel === null) return <></>;
        console.log('this.state.travels from inside EditTravel/render: ', travel)
        // const travel = travels.filter(travel => travel._id === this.props.match.params.id);
        console.log('this is the travel we are going to work with: ', travel);
        // if (travel.length > 0) {
        if (travel) {
            return (
                <div className="add-travel">
                    <form onSubmit={this.handleFormSubmit}>
                    <div>
                        <label>Cities <span style={{color: 'red'}}>*</span></label>
                        <textarea name="city" cols="40" value={this.state.city} required onChange={ e => this.handleChange(e) } />
                    </div>
                    <div>
                        <label>Details: </label>
                        <textarea name="details" rows="4" cols="40" value={this.state.details} placeholder='How was it? How long did you stay? Any special memories?' onChange={ e => this.handleChange(e) } />
                    </div>
                    <div className="radio">
                        <div>
                            <input type="radio" id={'visited'.concat(travel._id)} name="visited" value="true" defaultChecked={this.state.visited ? true : false} required onChange={ e => this.handleChange(e) } />
                            <label htmlFor={'visited'.concat(travel._id)}>Already visited</label>
                        </div>
                        <div>
                            <input type="radio" id={'planned'.concat(travel._id)} name="visited" value="false" defaultChecked={this.state.visited ? false : true} onChange={ e => this.handleChange(e) } />
                            <label htmlFor={'planned'.concat(travel._id)}>Future trip <span style={{color: 'red'}}>*</span></label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-secondary" onClick={ () => this.deleteTravel(`${travel._id}`) }>Delete</button>
                        <button type="submit" className="btn btn-primary">Save travel</button>
                    </div>
                    </form>
                  </div>
            )
        } else return <></>
	}
}

export default EditTravel;