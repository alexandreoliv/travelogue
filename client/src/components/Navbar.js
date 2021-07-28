import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './auth/auth-service';

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
                <nav className="nav-style">
                    <ul>
                    {userIsLoggedIn && <li>Welcome, {userData.username} </li>}
                        <li>
                            <Link to="/travels" style={{ textDecoration: 'none' }}>
                            Travels
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <button onClick={() => this.logoutUser()}>Logout</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
        } else {
            return (
                <div>
                    <nav className="nav-style">
                        <ul>
                            <li>
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    Log In
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" style={{ textDecoration: 'none' }}>
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            );
        }
    }
}

export default Navbar;