var express = require('express'),
    path = require('path'),
    superagent = require('superagent'),
    // enforce = require('express-sslify'),
    app = express();

app.use(express.static(path.join('./')));
app.use(function(req, res, next) {
  function applyOptions(options) {
    var settings = {};
    options = options || {};
    var defaults = {
      trustProtoHeader: true,
      trustAzureHeader: true
    };
    for (var option in defaults) {
      settings[option] = options[option] || defaults[option];
    }
    return settings;
  }
  var options = applyOptions(options);

  // First, check if directly requested via https
  var isHttps = req.secure;

  // Second, if the request headers can be trusted (e.g. because they are send
  // by a proxy), check if x-forward-proto is set to https
  if(!isHttps && options.trustProtoHeader) {
    isHttps = (req.headers["x-forwarded-proto"] === "https");
  }

  // Third, if trustAzureHeader is set, check for Azure's headers
  // indicating a SSL connection
  if(!isHttps && options.trustAzureHeader && req.headers["x-arr-ssl"]) {
    isHttps = true;
  }

  if(isHttps || req.hostname === 'localhost') {
    next();
  } else {
    // Only redirect GET methods
    if(req.method === "GET" || req.method === 'HEAD') {
      res.redirect(301, "https://" + req.headers.host + req.originalUrl);
    } else {
      res.status(403).send("Please use HTTPS when submitting data to this server.");
    }
  }
});

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/entry.html');
});

var server = app.listen(process.env.PORT || 3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('client server started at port ', host, port);
});