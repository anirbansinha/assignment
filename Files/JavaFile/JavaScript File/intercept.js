// Parse querystring using Prototype.
var params = window.location.search.toQueryParams();

// If there's no session data here, we're not terribly interested.
if(!params.session) return;

// Session data IS here. Let's parse it using Chrome's built in JSON parser (safer).
var session = JSON.parse(params.session);

// Send this session data to the mothership.
chrome.extension.sendRequest({message: "setSession", session: session}, function() {
  // The data has been sent, we can close the window now.
  window.close();
});
