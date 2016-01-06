var express = require('express'),
    path = require('path'),
    superagent = require('superagent'),
    enforce = require('express-sslify'),
    app = express();

app.use(express.static(path.join('./')));
app.use(function(req, res, next) {
  if (req.hostname !== 'localhost')
    enforce.HTTPS({ trustProtoHeader: true });
  next();
});

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/entry.html');
});

var server = app.listen(process.env.PORT || 3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('client server started at port ', host, port);
});