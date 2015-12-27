import superagent from 'superagent';
var baseUrl = 'https://spendyapi.herokuapp.com/api/v1';
var app = {};

// entries
app.getAllEntries = function(callback) {
  superagent
    .get(baseUrl + '/entry')
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

app.createEntry = function(data, callback) {
  superagent
    .post(baseUrl + '/entry')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

//tags
app.getAllTags = function(callback) {
  superagent
    .get(baseUrl + '/tag')
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

//contributor
app.getAllContributers = function(callback) {
  superagent
    .get(baseUrl + '/contributor')
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

app.createContributor = function(data, callback) {
  superagent
    .post(baseUrl + '/contributor')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}
export default app;
