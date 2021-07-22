import React, { Component } from 'react';
import './App.css';
import TravelList from './components/travels/TravelList';

class App extends Component {
	render() {
		return (
			<div className="App">
				<TravelList />
			</div>
		)
	}
}

export default App;