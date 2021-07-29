const router = require("express").Router();
const mongoose = require('mongoose');
 
// // create a middleware to check if the user is logged in
// const loginCheck = () => {
// 	return (req, res, next) => {
// 		// is there a logged in user - using passport you can use req.isAuthenticated()
// 		console.log('checking if authenticated');
// 		if (req.isAuthenticated()) {
// 			console.log('yes, authenticated');
// 			// proceed as intended
// 			next();
// 		} else {
// 			console.log('no, not authenticated');
// 			// there is no user logged in
// 			// we redirect to /login
// 			// res.redirect('/auth/facebook');
// 			res.redirect('/travels');
// 		}
//   	}
// }

const Country = require('../models/Country');

// POST route => to edit a country
router.put('/countries', (req, res, next) => {
	const { id, city, details, visited } = req.body;
	Country
		.findByIdAndUpdate(id, {
			city,
			details,
			visited 
		})
		.then(response => res.json(response))
		.catch(err => res.json(err));
});

// POST route => to create a new country
router.post('/countries', (req, res, next) => {
    const { country, city, details, visited } = req.body;
   
    Country.create({
        country,
        city,
        details,
        visited,
        owner: req.user._id
    })
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// GET route => to get all the countries from the user
router.get('/countries/user', (req, res, next) => {
	console.log('req.user', req.user);
    Country.find({ owner: req.user._id })
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// GET route => to get a specific country
router.get('/countries/:countryId', (req, res, next) => {
    Country.findById(req.params.countryId)
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// GET route => to get all the countries
router.get('/countries', (req, res, next) => {
	console.log('req.user', req.user);
    Country.find()
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// GET route => to get a specific country
router.delete('/countries/:countryId', (req, res, next) => {
  Country.findByIdAndDelete(req.params.countryId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// router.get('/travels/new', (req, res, next) => {
// 	console.log('----->>> GET /travels/new called');
// 	// if (req.user.role === 'admin')
// 	// 	res.render('travels/new', { api_key, admin: req.user, user: req.user, title: 'Add Your Location' });
// 	// else
// 		res.render('travels/new', { title: 'Add Your Location' })
// });

module.exports = router;