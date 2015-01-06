var material = require('../models/material.js');

var exports = module.exports = {};

exports.postMaterial = function (req, res) {
	if(!req.body.data){
		material.postMaterial(req.body, function(data) {
			res.send(data);
		});
	} else {
		material.postMaterial(req.body.data, function(data) {
			res.send(data);
		});
	}
};
/*
exports.putMaterialVersion = function (req, res) {
	material.putMaterialVersion(req.body, function(data) {
		res.send(data);
	});
};
*/
exports.getMaterialClones = function (req, res) {
	material.getMaterialClones(req.params.id, function(data) {
		res.send(data);
	});
};

exports.putMaterial = function (req, res) {
	console.log('backend gotten', req.body);
	material.putMaterial(req.body, function(data) {
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
