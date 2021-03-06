const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const SALT_ROUNDS = 10;

const User = require('../models/User');

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ message: 'Provide username and password' });
		return;
	}

	// make sure passwords are strong:
	const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	if (!regex.test(password)) {
		res.status(500).json({ errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
		return;
	}

	bcryptjs
		.genSalt(SALT_ROUNDS)
		.then(salt => bcryptjs.hash(password, salt))
		.then(hashedPassword => {
		return User.create({
			username,
			password: hashedPassword
		});
		})
		.then(userFromDB => {
		console.log('Newly created user is: ', userFromDB);
		// send the user's information to the frontend
		// we can use also: res.status(200).json(req.user);
		res.status(200).json(userFromDB);
		})
		.catch(error => {
		if (error instanceof mongoose.Error.ValidationError) {
			res.status(500).json({ errorMessage: error.message });
		} else if (error.code === 11000) {
			res.status(500).json({
			errorMessage: 'Username and email need to be unique. Either username or email is already used.'
			});
		} else {
			next(error);
		}
		}); // close .catch()
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, theUser, failureDetails) => {
		if (err) {
			res.status(500).json({ message: 'Something went wrong authenticating user' });
			return;
		}
	
		if (!theUser) {
			// "failureDetails" contains the error messages
			// from our logic in "LocalStrategy" { message: '...' }.
			res.status(401).json(failureDetails);
			return;
		}
	
		// save user in session
		req.login(theUser, err => {
			if (err) {
				res.status(500).json({ message: 'Session save went bad.' });
				return;
			}
	
			// we are now logged in (that's why we can also send req.user)
			res.status(200).json(theUser);
		});
		})(req, res, next);
});
  
router.post('/logout', (req, res, next) => {
	// req.logout() is defined by passport
	req.logout();
	res.status(200).json({ message: 'Log out success!' });
});
  
router.get('/loggedin', (req, res, next) => {
	// req.isAuthenticated() is defined by passport
	if (req.isAuthenticated()) {
		res.status(200).json(req.user);
		return;
	}
	res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;