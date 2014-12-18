// De controllers bevatten de functies voor de app.
var materialController = require('../controllers/materialControllers.js');
var videoController = require('../controllers/videoControllers.js');

// De routes die worden gebruikt door iedereen.
module.exports = function (express) {
	var app = express.Router();
	app.post('/material', materialController.postMaterial);
	//app.delete('/materiaal/:id', materialController.postMateriaal);
	//app.put('/materiaal/:id', materialController.postMateriaal);
	app.get('/material', materialController.getMaterials);
	app.get('/material/:id', materialController.getMaterial);

	app.post('/video', videoController.postVideo);
	app.get('/video', videoController.getVideos);
	app.get('/video/:id', videoController.getVideo);
	return app;
};
