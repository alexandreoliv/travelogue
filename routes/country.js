const router = require("express").Router();
const mongoose = require('mongoose');
const Country = require('../models/Country');

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

// GET route => to get all the countries
router.get('/countries', (req, res, next) => {
	console.log('req.user', req.user);
    Country.find()
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// DELETE route => to delete a specific country
router.delete('/countries/:countryId', (req, res, next) => {
  Country.findByIdAndDelete(req.params.countryId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// PUT route => to edit a country
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

module.exports = router;