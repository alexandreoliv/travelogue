// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
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
		// store: MongoStore.create({
		// 	mongoUrl: DB_URL
		// })
	})
)
// end of session configuration

// passport config
const User = require("./models/User");
const passport = require('passport');

// passport.serializeUser(function(user, done) {
//     console.log('user: ', user);
//     console.log('done: ', done);
//     done(null, user._id);
// });

// passport.deserializeUser(function(id, done) {
//     User
//         .findById(id)
//         .then(userFromDB => {
//             done(null, userFromDB);
//         })
//         .catch(err => {
//             done(err);
//         })
// })

app.use(passport.initialize());
app.use(passport.session());
// end of passport config

// Passport - FacebookStrategy starts here:
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: '/auth/facebook/callback'
        },
        
        (accessToken, refreshToken, profile, done) => {
            // save the profile on the Database
            // Save the accessToken and refreshToken if you need to call facebook apis later on
            console.log('accessToken: ', accessToken);
            console.log('refreshToken: ', refreshToken);
            console.log('profile: ', profile);
            console.log('done: ', done);

            User
                .findOne({ facebookId: profile.id })
                .then(user => {
                    if (user) {
                        done(null, user);
                        return;
                    }

                    User
                        .create({ facebookId: profile.id, name: profile.displayName })
                        .then(newUser => {
                            done(null, newUser);
                        })
                        .catch(err => done(err)); // closes User.create()
                })
                .catch(err => done(err)); // closes User.findOne()
        }
    )
);
// End of Passport - FacebookStrategy starts here:

// Not sure why I need those yet:
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Start handling routes here
const allRoutes = require("./routes/index");
app.use("/", allRoutes);

const countryRouter = require("./routes/country");
app.use("/api", countryRouter);

const authRouter = require('./routes/auth'); // <== has to be added
app.use('/api', authRouter); // <== has to be added

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;