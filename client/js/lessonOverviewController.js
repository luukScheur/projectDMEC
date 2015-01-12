var lessonOverviewController = function ($http, $scope, $routeParams, $location, $window) {
    var socket = {};
    socket = io.connect('http://localhost:3000');

    $scope.selectedItem = "54ac3ffe422d2a630c3a8366";

    $http.get("/lesson")
        .success(function (data) {
            console.log('lesson', data.data);
            $scope.lessons = data.data;
        })
        .error(function (data, status) {
            //alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });

    $scope.showItem = function (id) {
        $scope.selectedItem = id;
        console.log($scope.selectedItem);
    }

    $scope.category = ["veld", "lab", "werkplaats", "labratorium", "showroom"];
    $scope.types = ["type onderzoek 1", "type onderzoek 2", "type onderzoek 3", "type onderzoek 4", "type onderzoek 5", "type onderzoek 6", "type onderzoek 7", "type onderzoek 8"];

};