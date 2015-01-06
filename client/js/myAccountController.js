var myAccountController = function ($http, $scope, $routeParams, $location, $window) {
  var socket = {};
  socket = io.connect('http://localhost:3000');
  $scope.tab = 'lesson';
  $scope.user;
  $scope.myMaterial = [];
  $scope.myContributions = [];
  $scope.viewUser = false;

  if($routeParams.id == null) {
    // my Account!
    $scope.viewUser = false;
    $http.get("/getUser")
        .success(function (data) {
            if(!data.data){ console.log('niet ingelogd!'); $window.location = '/#/home'; } else {
              console.log('thisUser: ', data);
              $scope.user = data.data;
              $scope.getAccount();
            }
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        })
  } else {
    // other account!
    $scope.viewUser = true;
    $http.get("/user/" + $routeParams.id)
        .success(function (data) {
            $scope.user = data.data;
            if($routeParams.id == $scope.user._id){
              window.location = "#/myAccount";
            }
            $scope.getAccount();
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        })
  }
  $scope.getAccount = function () {
    // Mijn Materiaal
    $http.get("/materialAuthor/" + $scope.user._id)
        .success(function (data) {
            for(var i = 0; i < data.data.length; i++){
                if(data.data[i].original == null){
                  $scope.myMaterial.push(data.data[i]);
                }
            }
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        })
        
    // Mijn Bijdrage
    $http.get("/material")
        .success(function (data) {
            $scope.allMaterial = data.data;
            for(var i = 0; i < $scope.allMaterial.length; i++){
                if($scope.allMaterial[i].author == $scope.user._id && $scope.allMaterial[i].original !== null){
                  $scope.myContributions.push($scope.allMaterial[i]);
                }
            }
            console.log($scope.myContributions);
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        })

  }



};
