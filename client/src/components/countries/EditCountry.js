import React, { Component } from 'react';
import './AddCountry.css';

class EditCountry extends Component {
    state = { 
        city: this.props.country.city,
        details: this.props.country.details,
		visited: this.props.country.visited
    }

    deleteCountry = (id) => {
        console.log("------>>>>>> I'M RUNNING deleteCountry() FROM INSIDE EditCountry.js <<<<<<------")
		console.log("this is props inside EditCountry.js/deleteCountry: ", this.props)
        this.props.deleteCountry(id);
    }

    editCountry = (id, city, details, visited) => {
        console.log("------>>>>>> I'M RUNNING editCountry() FROM INSIDE EditCountry.js <<<<<<------")
		console.log("this is props inside EditCountry.js/editCountry: ", this.props)
        this.props.editCountry(id, city, details, visited);
    }

    handleFormSubmit = (event) => {
        const city = this.state.city;
        const details = this.state.details;
        const visited = this.state.visited;
        const id = this.props.country._id;
        console.log('alex, this.props.user._id is: ', this.props.user._id)
        
        this.editCountry(id, city, details, visited);
	}
	
	handleChange = (event) => { 
		const {name, value} = event.target;
		console.log('name of event.target: ', event.target.name)
		this.setState({[name]: value});
	}

    render() {
        console.log("------>>>>>> I'M RUNNING render() FROM INSIDE EditCountry.js <<<<<<------")
        console.log('this.props inside EditCountry.js/render(): ', this.props)
        const { country } = this.props;
        
        console.log('this.state.countries from inside EditCountry/render: ', country)
        console.log('this is the country we are going to work with: ', country);
        if (country) {
            return (
                <div className="add-country">
                    <form onSubmit={this.handleFormSubmit}>
                        <div>
                            <label>Cities <span style={{color: 'red'}}>*</span></label>
                            <textarea name="city" cols="40" value={this.state.city} required onChange={ e => this.handleChange(e) } />
                        </div>
                        <div>
                            <label>Details: </label>
                            <textarea name="details" rows="4" cols="40" value={this.state.details} placeholder={this.props.placeholder} onChange={ e => this.handleChange(e) } />
                        </div>
                        <div className="radio">
                            <div>
                                <input type="radio" id={'visited'.concat(country._id)} name="visited" value="true" defaultChecked={this.state.visited ? true : false} required onChange={ e => this.handleChange(e) } />
                                <label htmlFor={'visited'.concat(country._id)}>Already visited</label>
                            </div>
                            <div>
                                <input type="radio" id={'planned'.concat(country._id)} name="visited" value="false" defaultChecked={this.state.visited ? false : true} onChange={ e => this.handleChange(e) } />
                                <label htmlFor={'planned'.concat(country._id)}>Future trip <span style={{color: 'red'}}>*</span></label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary" style={{margin: "0 5px 20px 5px", padding: "3px"}} onClick={ () => this.deleteCountry(`${country._id}`) }>Delete</button>
                        <button type="submit" className="btn btn-primary" style={{margin: "0 5px 20px 5px", padding: "3px"}}>Save country</button>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                        </div>
                    </form>
                </div>
            )
        } else return <></>
	}
}

export default EditCountry;