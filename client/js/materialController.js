var materialController = function ($http, $scope, $routeParams, $location, $window) {

  $scope.materialTypes = materialTypes;
  $scope.new = true;
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


  }
  $scope.edit = function () {
    if($scope.description == '') {
      alert ('vul wat in..');
    } else {
      console.log('update material..');
      $http.put('/material/' + $routeParams.id, {_id: $routeParams.id, description: $scope.description})
        .success(function (data) {
            console.log(data);
            $scope.message = 'Materiaal is succesvol bewerkt';
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        }
      );
    }
  }
  $scope.upload = function () {
    console.log($scope.selectedType);
    var file = document.getElementById('image-file');
    console.log();
    if(file.files.length == 0){
      alert('geen bestand geselecteerd');
    } else {
      $http.get("/getUser")
          .success(function (data) {
              if(!data.data){ console.log('niet ingelogd!'); $window.location = '/#/home'; } else {
              $scope.user = data.data;
              $scope.userID = data.data._id;
              }
          })
      $scope.newMaterial = {
        title: $scope.title,
        description: $scope.description,
        type: document.getElementById('selectedType').value,
        author: $scope.userID,
        likes: 0,
        views: 0
      };
      $http.post('/material', {data: $scope.newMaterial})
        .success(function (data) {
            console.log(data);
        })
        .error(function (data, status) {
            console.log("ERROR: show question controller error", status, data);
        }
      );
      console.log($scope.newMaterial);
      $scope.message = 'bestand is geüpload!';

    }
  }
};
