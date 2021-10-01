var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing')
let user = require('../controllers/user')

router.get('/login', user.show_login)
router.get('/signup', user.show_signup)
router.post('/login', user.login)
router.post('/signup', user.signup)
/* GET home page. */
router.get('/', landing.get_landing)
router.post('/', landing.submit_lead)
// this new route will call that Create() function we made in landing.js
// it will not only call that function, but the browser path will set to /leads.
router.get('/leads', landing.show_leads)

router.get('/lead/:lead_id', landing.show_lead)
router.get('/lead/:lead_id/edit', landing.show_edit_lead)
router.post('/lead/:lead_id/edit', landing.edit_lead)
router.post('/lead/:lead_id/delete', landing.delete_lead)
router.post('/lead/:lead_id/delete-json', landing.delete_lead_json)


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
