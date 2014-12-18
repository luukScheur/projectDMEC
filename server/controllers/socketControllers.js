var users = [];


var response = function(message, error, data) {
	return {
		message : message,
		error : error,
		data : data
	};
}

module.exports = function (io) {
	io.sockets.on('connection', function (socket) {
		console.log('iemand is connected');
		socket.on('disconnect', function() {
			console.log('iemand is disconnected');
   		});
	});
}
