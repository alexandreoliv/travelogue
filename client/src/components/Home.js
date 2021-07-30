import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './auth/auth-service';
import Map from './Map';
import AddCountry from './countries/AddCountry';
import CountryList from './countries/CountryList';
import './Home.css';

class Navbar extends Component {
    logoutUser = () => {
        authService.logout().then(() => {
            this.props.getUser(null, false);
        });
    };

    render() {
        const { userIsLoggedIn, userData } = this.props;
        if (userIsLoggedIn) {
            return (
                <>
                    <nav className="nav-style">
							{userIsLoggedIn && <p style={{fontWeight: "bold", color: "#137ff9"}}>{userData.username}'s travelogue</p>}
							<div className="nav-style-buttons">
								{/* Button trigger modal */}
								<button type="button" className="btn btn-primary btn-countries" data-toggle="modal" data-target="#addcountry">
									Add Country
								</button>
								{/* Button trigger modal */}
								<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editcountries">
									Edit Countries
								</button>
							</div>
							<Link to="/">
								<button type="button" className="btn btn-primary" onClick={() => this.logoutUser()}>Log out</button>
							</Link>
                    </nav>

					{/* Modal */}
					<div className="modal fade" id="addcountry" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content" style={{width: '480px'}}>
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">Add Country</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<AddCountry
										user={userData}
										allCountries={this.props.allCountries}
										addCountry={this.props.addCountry}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Modal */}
					<div className="modal fade" id="editcountries" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content" style={{width: '480px'}}>
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">Edit Countries</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<CountryList
										user={userData}
										allCountries={this.props.allCountries}
										countries={this.props.countries}
										getUserCountries={this.props.getUserCountries}
										deleteCountry={this.props.deleteCountry}
										editCountry={this.props.editCountry}
									/>
								</div>
							</div>
						</div>
					</div>

                    <Map
                        user={userData}
                        countries={this.props.countries}
                        getUserCountries={this.props.getUserCountries}
                        deleteCountry={this.props.deleteCountry}
                    />
                </>
            );
        } else {
            return (
                <div>
                    <nav className="nav-style-login">
						<div>
							<h5>travelogue</h5>
							<div><Link to="/login" style={{ textDecoration: 'none' }}>
								<button type="button" className="btn btn-info" data-toggle="modal" data-target="#loginModal">
									Log in
								</button>
							</Link>
							<Link to="/signup" style={{ textDecoration: 'none' }}>
								<button type="button" className="btn btn-info" data-toggle="modal" data-target="#signupModal">
									Sign up
								</button>
							</Link>
							</div>
						</div>
                    </nav>
                </div>
            );
        }
    }
}

export default Navbar;