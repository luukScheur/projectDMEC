var myAccountController = function ($http, $scope, $routeParams, $location, $window) {
  var socket = {};
  socket = io.connect('http://localhost:3000');

  $scope.tab = 'lesson';
  
};
