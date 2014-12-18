var video = require('../models/video.js');

var exports = module.exports = {};

exports.postVideo = function (req, res) {
	video.postVideo(req.body, function(data) {
		res.send(data);
	});
};
exports.getVideos = function (req, res) {
	video.getVideos(function(data) {
		res.send(data);
	});
};
exports.getVideo = function (req, res) {
	video.getVideo(req.params.id, function(data) {
		res.send(data);
	});
};
