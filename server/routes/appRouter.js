// De controllers bevatten de functies voor de app.
var materialController = require('../controllers/materialControllers.js');
var videoController = require('../controllers/videoControllers.js');
var userController = require('../controllers/userControllers.js');

// De routes die worden gebruikt door iedereen.
module.exports = function (express) {
	var app = express.Router();
	app.post('/material', materialController.postMaterial);
	//app.delete('/material/:id', materialController.postMateriaal);
	//app.put('/material/:id', materialController.postMateriaal);
	app.get('/material', materialController.getMaterials);
	app.get('/material/:id', materialController.getMaterial);
	app.get('/materialAuthor/:id', materialController.getMaterialsByAuthor);

	app.post('/video', videoController.postVideo);
	app.get('/video', videoController.getVideos);
	app.get('/video/:id', videoController.getVideo);

	app.post('/user', userController.postUser);
	app.get('/user', userController.getUsers);
	app.put('/userblock/:id', userController.putUserBlock);
	app.get('/user/:id', userController.getUser);

	app.get('/getUser', userController.getLoginUser);
	app.post('/postUser/:id', userController.loginUser);

	return app;
};
