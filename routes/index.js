const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  	res.json("All good in here");
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: `${process.env.FRONTEND_HOST}/error`}), (req, res) => {
	res.redirect(`${process.env.FRONTEND_HOST}`);
});

router.get('/logout', (req, res, next) => {
	console.log('user BEFORE log out: ' + req.user)
	req.logout();
	console.log('user AFTER log out: ' + req.user)
	res.redirect(`${process.env.FRONTEND_HOST}`);
});

module.exports = router;