var myAccountController = function ($http, $scope, $routeParams, $location, $window) {
  var socket = {};
  socket = io.connect('http://localhost:3000');
  $scope.tab = 'lesson';
  $scope.user;
  $scope.myMaterial = [];
  $scope.viewUser = false;

  if($routeParams.id == null) {
    $scope.viewUser = false;
    $http.get("/getUser")
        .success(function (data) {
            if(!data.data){ console.log('niet ingelogd!'); $window.location = '/#/home'; } else {
            console.log('thisUser: ', data);
            $scope.user = data.data;
            $http.get("/materialAuthor/" + $scope.user._id)
                .success(function (data) {
                    $scope.myMaterial = data.data;
                })
                .error(function (data, status) {
                    console.log("ERROR: show question controller error", status, data);
                })
            }
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        })
  } else {
    $scope.viewUser = true;
    $http.get("/user/" + $routeParams.id)
        .success(function (data) {
            $scope.user = data.data;
            $http.get("/materialAuthor/" + $scope.user._id)
                .success(function (data) {
                    $scope.myMaterial = data.data;
                })
                .error(function (data, status) {
                    console.log("ERROR: show question controller error", status, data);
                })
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        })
  }


};
