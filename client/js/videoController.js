var videoController = function ($http, $scope, $routeParams, $location, $window) {
	var socket = {};
	socket = io.connect('http://localhost:3000');

   $http.get("/video")
        .success(function (data) {
            console.log(data);
						$scope.video = data.data;
        })
        .error(function (data, status) {
            alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });


	};
