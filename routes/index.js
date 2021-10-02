var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing')
let user = require('../controllers/user')

let { isLoggedIn, hasAuth } = require('../middleware/hasAuth.js')

router.get('/login', user.show_login)
router.get('/signup', user.show_signup)
router.post('/login', user.login)
router.post('/signup', user.signup)
router.post('/logout', user.logout)
router.get('/logout', user.logout)

/* GET home page. */
router.get('/', landing.get_landing)
router.post('/', landing.submit_lead)
// this new route will call that Create() function we made in landing.js
// it will not only call that function, but the browser path will set to /leads.


// about to try this shit. adding a sequence called noop, prior to having
// this shit connected. otherwise it requrns

const noop = function(req, res, next) {
  // next will transfer the control of execution to the next function in line
  next()
}

// these noop calls are called middleware.
// AHHHHH. so it checks whether it's logged in, prior to rendering the leads page.
// otherwise it returns a 404 error.
router.get('/leads', isLoggedIn, landing.show_leads)

// how can i pass user to that tho?
// the thing appears to be logged out if you change the path.

router.get('/lead/:lead_id', hasAuth, landing.show_lead)
router.get('/lead/:lead_id/edit', hasAuth, landing.show_edit_lead)
router.post('/lead/:lead_id/edit', hasAuth, landing.edit_lead)
router.post('/lead/:lead_id/delete', hasAuth, landing.delete_lead)
router.post('/lead/:lead_id/delete-json', hasAuth, landing.delete_lead_json)


module.exports = router;

// landing comes from controllers.
// & it appears to contain a function object called show_leads, which, in fact
// looks like this:
// exports.show_leads = function(req, res, next) {
//   models.Lead.findAll().then(leads => {
//     res.render('landing', { title: 'Cleveland', subtitle: 'motherfucker', leads: leads });
//   })
// }
// idk what res.render('landing') means or whether i could change that.
