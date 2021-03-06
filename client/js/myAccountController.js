var myAccountController = function ($http, $scope, $routeParams, $location, $window) {
  var socket = {};
  socket = io.connect('http://localhost:3000');
  $scope.tab = 'lesson';
  $scope.user;
  $scope.myMaterial = [];
  $scope.myContributions = [];
  $scope.myMaterialComments = [];
  $scope.myLessons = [];
  $scope.viewUser = false;
  $scope.commentTab = 'material';

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
        $http.get("/lesson")
            .success(function (data) {
                console.log('lesson', data.data);
                $scope.lessons = data.data;
                for(var i = 0; i < $scope.lessons.length; i++){
                  if($scope.lessons[i].author == $scope.user._id){
                    $scope.myLessons.push($scope.lessons[i]);
                  }
                }
            })
            .error(function (data, status) {
                //alert("AJAX ERROR");
                console.log("ERROR: show question controller error", status, data);
            });

    // Mijn Bijdrage
    $http.get("/material")
        .success(function (data) {
            $scope.allMaterial = data.data;
            for(var i = 0; i < $scope.allMaterial.length; i++){
                if($scope.allMaterial[i].author == $scope.user._id && $scope.allMaterial[i].original !== null){
                  $scope.myContributions.push($scope.allMaterial[i]);
                }
                for(var j = 0; j < $scope.allMaterial[i].comments.length; j++) {
                  if($scope.allMaterial[i].comments[j].author == $scope.user._id){
                    $scope.allMaterial[i].comments[j].original = $scope.allMaterial[i]._id;
                    $scope.allMaterial[i].comments[j].originalName = $scope.allMaterial[i].title;
                    $scope.myMaterialComments.push($scope.allMaterial[i].comments[j]);
                  }
                }

            }
            console.log('myComment', $scope.myMaterialComments);
            console.log($scope.myContributions);
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        })

  }



};
