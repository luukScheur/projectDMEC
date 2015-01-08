var lessonOverviewController = function ($http, $scope, $routeParams, $location, $window) {
    var socket = {};
    socket = io.connect('http://localhost:3000');


    $http.get("/lesson")
        .success(function (data) {
            console.log('lesson', data.data);
        })
        .error(function (data, status) {
            //alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });
};