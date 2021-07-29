import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './auth/auth-service';
import Map from './Map';
import AddTravel from './travels/AddTravel';
import TravelList from './travels/TravelList';

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
                        {userIsLoggedIn && <p>{userData.username}'s travelogue</p>}
                            {/* <li>
                                <Link to="/travels" style={{ textDecoration: 'none' }}>
                                Travels
                                </Link>
                            </li> */}
                                <Link to="/">
									<button type="button" className="btn btn-primary" onClick={() => this.logoutUser()}>Log out</button>
                                </Link>
                    </nav>
                    {/* Button trigger modal */}
					<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addtravel">
						Add Travel
					</button>
					{/* Button trigger modal */}
					<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#edittravels">
						Edit Travels
					</button>

					{/* Modal */}
					<div className="modal fade" id="addtravel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content" style={{width: '480px'}}>
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">Add Travel</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<AddTravel
										user={userData}
										countries={this.props.countries}
										addTravel={this.props.addTravel}
									/>
								</div>
								{/* <div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
									<button type="button" className="btn btn-primary">Save changes</button>
								</div> */}
							</div>
						</div>
					</div>

					{/* Modal */}
					<div className="modal fade" id="edittravels" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content" style={{width: '480px'}}>
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">Edit Travels</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<TravelList
										user={userData}
										countries={this.props.countries}
										travels={this.props.travels}
										getUserTravels={this.props.getUserTravels}
										deleteTravel={this.props.deleteTravel}
									/>
								</div>
								{/* <div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
									<button type="button" className="btn btn-primary">Save changes</button>
								</div> */}
							</div>
						</div>
					</div>

                    <Map
                        user={userData}
                        travels={this.props.travels}
                        getUserTravels={this.props.getUserTravels}
                        deleteTravel={this.props.deleteTravel}
                    />
                    {/* <AddTravel
                        user={userData}
                        countries={this.props.countries}
                        addTravel={this.props.addTravel}
                    /> */}
                </>
            );
        } else {
            return (
                <div>
                    <nav className="nav-style">
                        <Link to="/login" style={{ textDecoration: 'none' }}>
							<button type="button" className="btn btn-info" data-toggle="modal" data-target="#loginModal">
								Log in
							</button>
						</Link>
						<Link to="/signup" style={{ textDecoration: 'none' }}>
							<button type="button" className="btn btn-info" data-toggle="modal" data-target="#loginModal">
								Sign up
							</button>
						</Link>
                    </nav>
                </div>
            );
        }
    }
}

export default Navbar;