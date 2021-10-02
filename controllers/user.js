
let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport-setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../validators/signup');

exports.show_login = function(req, res, next) {
	res.render('user/login', { formData: {}, errors: {} });
}

exports.show_signup = function(req, res, next) {
	res.render('user/signup', { formData: {}, errors: {} });
}

const rerender_signup = function(errors, req, res, next) {
	res.render('user/signup', { formData: req.body, errors: errors});
}
const generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// this returns a new user object.
exports.signup = function(req, res, next) {
	// this thing is the slot for errors.
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
			rerender_signup(errors, req, res, next);
		} else {
			return models.User.findOne({
				where: {
					is_admin: true
				}
			}).then(user => {
				let newUser;
				if (user !== null) {
					newUser = models.User.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						// is_admin: true
					});
					// it requires user to be null in order to make an admin. what the fuck?
				} else {
					newUser = models.User.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						is_admin: true
					});
				}
				return newUser.save().then(result => {
					passport.authenticate('local', {
						successRedirect: "/",
						failureRedirect: "/signup",
						failureFlash: true
					})(req, res, next);
				})
			})
		}
	})
}

exports.login = function(req, res, next) {
	passport.authenticate('local', {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	})(req, res, next);
}
exports.logout = function(req, res, next) {
	// when this is called. req will have a .logout() attribute.
	req.logout();
	// destroy the session
	req.session.destroy();
	// redirect to slash.
	res.redirect('/');
}
