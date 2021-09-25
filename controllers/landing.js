exports.get_landing = function(req, res, next) {
  res.render('landing', { title: 'Express' });
}
// ok brilliant.
// the console is the dev console. not chrometools.
// it appears in the terminal.
exports.submit_lead = function(req, res, next) {
  console.log("lead email:", req.body.lead_email)
  res.redirect('/')
}
