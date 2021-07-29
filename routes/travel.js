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

const Travel = require('../models/Travel');

// POST route => to create a new travel
router.post('/travels', (req, res, next) => {
    const { country, city, details, visited } = req.body;
   
    Travel.create({
        country,
        city,
        details,
        visited,
        owner: req.user._id
    })
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// GET route => to get all the travels from the user
router.get('/travels/user', (req, res, next) => {
	console.log('req.user', req.user);
    Travel.find({ owner: req.user._id })
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// GET route => to get a specific travel
router.get('/travels/:travelId', (req, res, next) => {
    Travel.findById(req.params.travelId)
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// GET route => to get all the travels
router.get('/travels', (req, res, next) => {
	console.log('req.user', req.user);
    Travel.find()
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// GET route => to get a specific travel
router.delete('/travels/:travelId', (req, res, next) => {
  Travel.findByIdAndDelete(req.params.travelId)
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