"use strict";
var MOOCBOOKApp = angular.module("MOOCBOOKApp", ['ngRoute', 'ngResource']);

// Custom filter for materiaalOverzicht (Controller) page
MOOCBOOKApp.filter('filterTypes', function() {
    return function(list, selectedTypes) {
				return list.filter(function(item) {
					if(selectedTypes[0] == null) {
						return true;
					} else {
						if (selectedTypes.indexOf(item.type) != -1) {
							return true;
						}
						return false;
					}
				});
    };
})

MOOCBOOKApp.factory('socket', function() {
	var socket = io.connect('http://localhost:3000');
	return socket;
});


MOOCBOOKApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: './views/homeLoggedIn.html',
		controller: homeLoggedInController
	});
	$routeProvider.when('/materialOverview', {
		templateUrl: './views/materialOverview.html',
		controller: materialOverviewController
	});
  $routeProvider.when('/material', {
    templateUrl: './views/material.html',
    controller: materialController
  });
  $routeProvider.when('/material/:id', {
    templateUrl: './views/material.html',
    controller: materialController
  });
  $routeProvider.when('/myAccount', {
    templateUrl: './views/myAccount.html',
    controller: myAccountController
  });
	$routeProvider.otherwise({
		redirectTo: "/home"
	});
}]);
