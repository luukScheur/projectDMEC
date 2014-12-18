var user = require('../models/user.js');

var exports = module.exports = {};
var loggedinID;

exports.postUser = function (req, res) {
  user.postUser(req.body, function(data) {
    res.send(data);
  });
};
exports.getUsers = function (req, res) {
  user.getUsers(function(data) {
    res.send(data);
  });
};
exports.getUser = function (req, res) {
  user.getUser(req.params.id, function(data) {
    res.send(data);
  });
};
exports.putUserBlock = function (req, res) {
  user.putUserBlock(req.body, function(data) {
    res.send(data);
  });
};

exports.loginUser = function (req, res) {
  loggedinID = req.params.id;
  res.send('user is ingelogd met id: ' + loggedinID);
};

exports.getLoginUser = function (req, res) {
  user.getUser(loggedinID, function(data) {
    res.send(data);
  });
};
