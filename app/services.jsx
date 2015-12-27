import superagent from 'superagent';
var baseUrl = 'https://spendyapi.herokuapp.com/api/v1';
var services = {};

// entries
services.getAllEntries = function(callback) {
  superagent
    .get(baseUrl + '/entry')
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body.reverse());
    });
}

services.createEntry = function(data, callback) {
  superagent
    .post(baseUrl + '/entry')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}
services.deleteEntry = function(id, callback) {
  superagent
    .delete(baseUrl + '/entry/' + id)
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

//tags
services.getAllTags = function(callback) {
  superagent
    .get(baseUrl + '/tag')
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

services.createTag = function(data, callback) {
  superagent
    .post(baseUrl + '/tag')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

services.deleteTag = function(id, callback) {
  superagent
    .delete(baseUrl + '/tag/' + id)
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}


//contributor
services.getAllContributors = function(callback) {
  superagent
    .get(baseUrl + '/contributor')
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

services.createContributor = function(data, callback) {
  superagent
    .post(baseUrl + '/contributor')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

services.deleteContributor = function(id, callback) {
  superagent
    .delete(baseUrl + '/contributor/' + id)
    .end(function(err, res) {
      if (err) return callback(err);
      return callback(res.body);
    });
}

//export
export default services;
