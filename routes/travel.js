const router = require("express").Router();
const mongoose = require('mongoose');
 
const Travel = require('../models/Travel');

// POST route => to create a new travel
router.post('/travels', (req, res, next) => {
    const { country, city, date, transportation, picture } = req.body;
   
    Travel.create({
        country,
        city,
        date,
        transportation,
        picture
    })
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

// GET route => to get all the travels
router.get('/travels', (req, res, next) => {
    Travel.find()
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