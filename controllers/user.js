

// make two functions which take a request, response and next, args...
exports.show_login = function(req, res, next) {
  // render to the response (DOM??) at path='user/login'
  // and submit this formdata.
  res.render('user/login', { formData: {}, errors: {} })
}

exports.show_signup = function(req, res, next) {
  res.render('user/signup', { formData: {}, errors: {}})
}
