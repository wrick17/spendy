import superagent from 'superagent';
import utils from './utils.jsx'
var baseUrl = 'https://spendyapi-dev.herokuapp.com/api/v1';
var services = {};

if (window.location.hostname === 'spendyweb.herokuapp.com') baseUrl = 'https://spendyapi.herokuapp.com/api/v1';

// entries
services.getAllEntries = function(callback, date = null) {
  var dateParams = '';
  if (date) {
    dateParams += '?fromDate=' + utils.firstDay(date) + '&toDate=' + utils.lastDay(date);
  }
  superagent
    .get(baseUrl + '/entry/' + dateParams)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body.reverse());
    });
}

services.createEntry = function(data, callback) {
  superagent
    .post(baseUrl + '/entry')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}
services.deleteEntry = function(id, callback) {
  superagent
    .delete(baseUrl + '/entry/' + id)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}

services.updateEntry = function(id, data, callback) {
  superagent
    .put(baseUrl + '/entry/' + id)
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}


//tags
services.getAllTags = function(callback) {
  superagent
    .get(baseUrl + '/tag')
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}

services.createTag = function(data, callback) {
  superagent
    .post(baseUrl + '/tag')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}

services.deleteTag = function(id, callback) {
  superagent
    .delete(baseUrl + '/tag/' + id)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}

services.updateTag = function(id, data, callback) {
  superagent
    .put(baseUrl + '/tag/' + id)
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}


//contributor
services.getAllContributors = function(callback, date = null) {
  var dateParams = '';
  if (date) {
    dateParams += '?fromDate=' + utils.firstDay(date) + '&toDate=' + utils.lastDay(date);
  }
  superagent
    .get(baseUrl + '/contributor/' + dateParams)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}

services.createContributor = function(data, callback) {
  superagent
    .post(baseUrl + '/contributor')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}

services.deleteContributor = function(id, callback) {
  superagent
    .delete(baseUrl + '/contributor/' + id)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}

services.updateContributor = function(id, data, callback) {
  superagent
    .put(baseUrl + '/contributor/' + id)
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) return callback({
        status: err.status,
        message: JSON.parse(res.text).message
      });
      return callback(res.body);
    });
}

//export
export default services;
