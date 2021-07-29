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
				<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header border-bottom-0">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="form-title text-center">
									<h4>Log in</h4>
								</div>
								<div class="d-flex flex-column text-center">
										<div class="form-group">
											<input type="text" class="form-control" id="email1"placeholder="username" name="username" value={this.state.username} onChange={this.handleChange} />
										</div>
										<div class="form-group">
											<input type="password" class="form-control" id="password1" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
										</div>
										<button type="submit" class="btn btn-info btn-block btn-round" data-bs-dismiss="modal">Log in</button>
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