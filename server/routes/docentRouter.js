// De controllers bevatten de functies voor de docent.
var docentControllers = require('../controllers/docentControllers.js');

// De routes die worden gebruikt door docent ('/docent').
module.exports = function (express) {
	var docentRouter = express.Router();
	docentRouter.post('/voorbeeld', docentControllers.eenFunctie);
	//docentRouter.delete('/voorbeeld/:id', eenfunctie);
	//docentRouter.put('/voorbeeld/:id', eenfunctie);
	//docentRouter.get('/voorbeeld', eenfunctie);

	return docentRouter;
}