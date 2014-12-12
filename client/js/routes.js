"use strict";
var MOOCBOOKApp = angular.module("MOOCBOOKApp", ['ngRoute']);

/*
MOOCBOOKApp.factory('socket', function() {
	var socket = io.connect('http://localhost:3000');
	return socket;
});
*/

MOOCBOOKApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/docent', {
		templateUrl: './views/docent.html',
		controller: docentController
	});
	$routeProvider.otherwise({
		redirectTo: "/docent"
	});
}]);