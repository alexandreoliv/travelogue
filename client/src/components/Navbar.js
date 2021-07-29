import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './auth/auth-service';
import Map from './Map';
import AddTravel from './travels/AddTravel';

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
                        <ul>
                        {userIsLoggedIn && <li>Welcome, {userData.username} </li>}
                            {/* <li>
                                <Link to="/travels" style={{ textDecoration: 'none' }}>
                                Travels
                                </Link>
                            </li> */}
                            <li>
                                <Link to="/">
									<button type="button" class="btn btn-primary" onClick={() => this.logoutUser()}>Log out</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* Button trigger modal */}
					<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
						Add Travel
					</button>

					{/* Modal */}
					<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog" role="document">
							<div class="modal-content" style={{width: '480px'}}>
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Add Travel</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<AddTravel
										user={userData}
										countries={this.props.countries}
										addTravel={this.props.addTravel}
									/>
								</div>
								{/* <div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
									<button type="button" class="btn btn-primary">Save changes</button>
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
							<button type="button" class="btn btn-info" data-toggle="modal" data-target="#loginModal">
								Log in
							</button>
						</Link>
						<Link to="/signup" style={{ textDecoration: 'none' }}>
							<button type="button" class="btn btn-info" data-toggle="modal" data-target="#loginModal">
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