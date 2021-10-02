// this refers to index.js inside models.
// it has all the shit in it.
// and it exports the database etc.
let models = require('../models');
// this refers to a package installed.
let validator = require('validator');

// make this function, it will take the entire request object,
// which also contains a slot for errors. it's the object that's generated
// when we submit a signup form.
const validateCreateUserFields = function(errors, req) {
	// this function would be using regex.
	// if validator.isEmail() tested on the req.body.email submission
	// turns out to be false, add an email key to errors, with this string value.
	if (!validator.isEmail(req.body.email)) {
		errors["email"] = "Please use a valid email.";
	}
	// run validator isAscii to check that password contains only valid characters.
	if (!validator.isAscii(req.body.password)) {
		errors["password"] = "Invalid characters in password, please try another one.";
	}
	//
	if (!validator.isLength(req.body.password, {min: 4, max: 25})) {
		errors["password"] = "Please ensure that your password has a minimum of 4 characters";
	}
}

// create this validateUser function.
// will take errors and request.
exports.validateUser = function(errors, req) {
	// and make a new promise. it promises to use that function created above.
	return new Promise(function(resolve, reject) {
		validateCreateUserFields(errors, req);
		return models.User.findOne({
			where: {
				email: req.body.email
			}
		}).then(u => {
			if (u !== null) {
				errors["email"] = "Email is already in use. Please login or reset your password";
			}
			resolve(errors);
		})
	})
}
// ^^ that thing just checks to see if email exists already.
