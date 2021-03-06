// gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// connects to the database
require("./db");

// handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

// this function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// session configuration
const session = require('express-session');
require('./config/passport');
const MongoStore = require('connect-mongo');
const DB_URL = process.env.MONGODB_URI;

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		// for how long is a user automatically logged in 
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		saveUninitialized: false,
		resave: true,
	})
)
// end of session configuration

// passport config
const User = require("./models/User");
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
// end of passport config

// start handling routes here
const countryRouter = require("./routes/country");
app.use("/api", countryRouter);

const authRouter = require('./routes/auth'); // <== has to be added
app.use('/api', authRouter); // <== has to be added

const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
	// if no routes match, send them the React HTML
	res.sendFile(__dirname + "/client/build/index.html");
});

// to handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;