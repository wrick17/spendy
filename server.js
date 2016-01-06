var express = require('express'),
    path = require('path'),
    superagent = require('superagent'),
    app = express();

app.use(express.static(path.join('./')));

app.get('/*', function(req, res) {
  if (req.hostname !== 'localhost' && req.protocol === 'http') {
    res.writeHead(301, {
      Location: "https://" + req.headers["host"] + req.url
    });
    res.end();
  }
  res.sendFile(__dirname + '/entry.html');
});

var server = app.listen(process.env.PORT || 3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('client server started at port ', port);

});