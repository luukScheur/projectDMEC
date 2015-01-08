var materialController = function ($http, $scope, $routeParams, $location, $window) {

  $scope.materialTypes = materialTypes;
  $scope.new = true;
  $scope.materialTab = 'overview';
  $scope.userID, $scope.material, $scope.materialClones;
  $scope.randomViews = Math.floor(Math.random()*100);
  $scope.randomLikes = Math.floor(Math.random()*10);

  //get user iD
  $http.get("/getUser")
      .success(function (data) {
          if(!data.data){ console.log('niet ingelogd!'); $window.location = '/#/home'; } else {
          $scope.user = data.data;
          $scope.userID = data.data._id;
          }
      })

  // check if new or edit
  if($routeParams.id == 0) {
    $scope.selectedType = '', $scope.title ='', $scope.description = '';
    $scope.new = true;
  } else {
    $scope.new = false;
    $http.get("/material/" + $routeParams.id)
        .success(function (data) {
            $scope.material = data.data;
            $scope.title = $scope.material.title;
            $scope.description = $scope.material.description;
            $scope.selectedType = $scope.material.type;
        })
    $http.get("/materialClones/" + $routeParams.id)
        .success(function (data) {
            $scope.materialClones = data.data;
        })


  }
  $scope.comment = function () {
      $http.put('/materialComment/' + $routeParams.id, {
        _id: $routeParams.id,
        description: $scope.commentDescription,
        author: $scope.user._id,
        authorName: $scope.user.name
        })
        .success(function (data) {
            console.log(data);
            $scope.commentMessage = 'Reactie is geplaatst';
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        });
  }
  $scope.edit = function () {
    if($scope.description == '') {
      alert ('vul wat in..');
    } else {
      console.log('update material..');
      //check if author publishes his own material
      if($scope.material.author == $scope.userID) {
        $http.put('/material/' + $scope.material._id, {
          _id: $scope.material._id,
          description: $scope.description,
          title: $scope.title
          })
          .success(function (data) {
              console.log(data);
              $scope.message = 'Materiaal is succesvol bewerkt';
          })
          .error(function (data, status) {
              console.log("ERROR: show question controller error", status, data);
          });

      } else {
        $http.post('/material', {
          description: $scope.description,
          title: $scope.title,
          original: $scope.material._id,
          type: $scope.material.type,
          author: $scope.userID,
          authorName: $scope.user.name
          })
          .success(function (data) {
              console.log(data);
              $scope.message = 'Materiaal is succesvol gecloned';
          })
          .error(function (data, status) {
              console.log("ERROR: show question controller error", status, data);
          });
      }
    }
  }
  $scope.upload = function () {
      $http.post('/material', {
        title: $scope.title,
        description: $scope.description,
        type: document.getElementById('selectedType').value,
        author: $scope.userID,
        authorName: $scope.user.name
        })
        .success(function (data) {
            console.log(data);
            $scope.message = 'bestand is geüpload!';
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        });
  }
};
