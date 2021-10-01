

const models = require('../models')

exports.get_landing = function(req, res, next) {
  res.render('landing', { title: 'Node.js and Express.js', subtitle: 'motherfucker', user: req.user });
}
// ok brilliant.
// the console is the dev console. not chrometools.
// it appears in the terminal.
exports.submit_lead = function(req, res, next) {
  console.log("lead email:", req.body.lead_email)
  // so these request objects are fucking huge.
  // console.log("request body: ", req.body)
  // console.log("request: ", req)
  console.log("request type: ", typeof req)
  console.log("keys: ", Object.keys(req));
  console.log("nkeys: ", Object.keys(req).length);
  console.log("headers: ", req.headers);

////////////////////////////////////////////////////////////////////////////////
// Q: where is this email object found?
// A: inside landing.pug... the form input's name is lead_email.
// Q: why do we create a model and where does it go?
//
////////////////////////////////////////////////////////////////////////////////
return models.Lead.create({
  // appears to be grabbed from the request body, under lead email.
  email: req.body.lead_email
}).then(lead => {
  res.redirect('/leads')
})
}

exports.show_edit_lead = function(req, res, next) {
  return models.Lead.findOne({
    where : {
      id : req.params.lead_id
    }
  }).then(lead => {
    res.render('lead/edit_lead', { lead : lead });
  })
}

// now we're gonna write this function to submit a lead edit.
exports.edit_lead = function(req, res, next) {
  console.log("PARAMS BRUH::::: ", req.params)
  req.params.lead_id
  req.body.lead_email
  // Lead would be inside index inside models folder.
  return models.Lead.update({
    email: req.body.lead_email
  }, {
    where: {
      id: req.params.lead_id
    }
  }).then(result => {
    res.redirect('/lead/' + req.params.lead_id)
    // and we're going to direct to a router function. the show_lead one.
  })
}


exports.show_lead = function(req, res, next) {
  return models.Lead.findOne({
    where : {
      id : req.params.lead_id
    }
  }).then(lead => {
    res.render('lead', { lead : lead });
  })
}

exports.show_leads = function(req, res, next) {
  models.Lead.findAll().then(leads => {
    res.render('landing', { title: 'Express & Node', subtitle: 'motherfucker', leads: leads });
  })
}

exports.delete_lead = function(req, res, next) {
  return models.Lead.destroy({
    where: {
      id: req.params.lead_id
    }
  }).then(result => {
    res.redirect("/leads")
  })
}

exports.delete_lead_json = function(req, res, next) {
  return models.Lead.destroy({
    where: {
      id: req.params.lead_id
    }
  }).then(result => {
    res.send({ msg: "Success" })
  })
}
