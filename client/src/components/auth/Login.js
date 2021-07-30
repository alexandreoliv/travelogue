import React, { Component } from 'react';
import authService from './auth-service';
import './Login.css';

class Login extends Component {
	state = { username: '', password: '' };

	handleFormSubmit = event => {
		event.preventDefault();
		const { username, password } = this.state;

		authService
		.login(username, password)
		.then(response => {
			this.setState({ username: '', password: '' });
			this.props.getUser(response, true);
		})
		.catch(error => console.log(error));
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
		<div>
			<form onSubmit={this.handleFormSubmit}>
				<div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header border-bottom-0">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-title text-center">
									<h4>Log in</h4>
								</div>
								<div className="d-flex flex-column text-center">
										<div className="form-group">
											<input type="text" className="form-control" id="login-username" placeholder="username" name="username" value={this.state.username} required onChange={this.handleChange} />
										</div>
										<div className="form-group">
											<input type="password" className="form-control" id="login-password" placeholder="password" name="password" value={this.state.password} required onChange={this.handleChange} />
										</div>
										<button type="submit" className="btn btn-info btn-block btn-round" data-bs-dismiss="modal">Log in</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
		);
	}
}

export default Login;