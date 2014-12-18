var material = require('../models/material.js');

var exports = module.exports = {};

exports.postMaterial = function (req, res) {
	material.postMaterial(req.body, function(data) {
		res.send(data);
	});
};
exports.getMaterials = function (req, res) {
	material.getMaterials(function(data) {
		res.send(data);
	});
};
exports.getMaterialsByAuthor = function (req, res) {
	material.getMaterialsByAuthor(req.params.id, function(data) {
		res.send(data);
	});
};
exports.getMaterial = function (req, res) {
	material.getMaterial(req.params.id, function(data) {
		res.send(data);
	});
};
