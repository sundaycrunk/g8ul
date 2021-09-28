// define a function called deleteLead,
// which takes a leadId
function deleteLead(leadId) {
  // with that, define an ajax request.
  // this might be native to any kind of JS.
  $.ajax({
    // this object will contain these attributes
    url: '/lead/' + leadId + '/delete-json',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    // take the leadId object passed here,
    // and turn it into a JSON STRING.
    // call it the data property of this request we're building.
    data: JSON.stringify({leadId}),
    // it will be a post request.
    type: 'POST',
    // define the success and error properties already.
    // we will either get a response or an error it looks like.
    // in case of success, take the response, console log it.
    // and locate the leadId we passed. and remove it.
    // FROM WHERE THO?
    success: ((res) => {
      console.log("Result: ", res)
      $("#"+leadId).remove()
    }),
    // and on error...
    error: ((error) => {
      console.log("Error: ", error)
    })
  })
}
