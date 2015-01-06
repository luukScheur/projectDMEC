var lesson = require('../models/lesson.js');

var exports = module.exports = {};

exports.postLesson = function (req, res) {
	lesson.postLesson(req.body, function(data) {
		res.send(data);
	});
};
exports.getLessons = function (req, res) {
	lesson.getLessons(function(data) {
		res.send(data);
	});
};
exports.getLesson = function (req, res) {
	lesson.getLesson(req.params.id, function(data) {
		res.send(data);
	});
};
