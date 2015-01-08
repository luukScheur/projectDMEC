var materialOverviewController = function ($http, $scope, $routeParams, $location, $window) {
	var socket = {};
	socket = io.connect('http://localhost:3000');

	$scope.material = [];
	$scope.materialTypes = materialTypes;
	$scope.favoriteMaterial = [];

	//get user iD
	$http.get("/getUser")
			.success(function (data) {
					if(!data.data){ console.log('niet ingelogd!'); $window.location = '/#/home'; } else {
					$scope.user = data.data;
					$scope.userID = data.data._id;
					}
			})

    $http.get("/material")
        .success(function (data) {
						console.log('materialenOntvangen', data.data);
						for(var i = 0; i < data.data.length; i++){
							if(data.data[i].original==null){
								$scope.material.push(data.data[i]);
							}
						}
						for (var i = 0; i < $scope.material.length; i ++) {
								$scope.material[i].favoriteIcon = "fa fa-star-o";
								for (var j = 0; j < $scope.user.favorites.length; j ++) {
										if ($scope.material[i]._id === $scope.user.favorites[j]) {
												$scope.material[i].favoriteIcon = "fa fa-star";
												$scope.favoriteMaterial.push($scope.material[i]);
										}
								}
						}
						$scope.getClones();
        })
        .error(function (data, status) {
            //alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });

  //Filters
	$scope.search = '';
	$scope.sort = 'id';
	$scope.sortOrder = false;
	$scope.selectedTypes = [];

	$scope.getClones = function () {
		$scope.countClones = [];
		for(var i = 0; i < $scope.material.length; i++){
			$http.get("/materialClones/" + $scope.material[i]._id)
					.success(function (data) {
							$scope.countClones.push(data.data.length);
							$scope.addToArray();
					})
					.error(function (data, status) {
							//alert("AJAX ERROR");
							console.log("ERROR: show question controller error", status, data);
					});
		}

	}
	$scope.addToArray = function (interval, value) {
		for(var i = 0; i < $scope.countClones.length; i++){
			$scope.material[i].countClones = $scope.countClones[i];
		}
	}

	$scope.toggleSelection = function (selectedType) {

		var idx = $scope.selectedTypes.indexOf(selectedType);
		// is currently selected
		if (idx > -1) {
		  $scope.selectedTypes.splice(idx, 1);
		}
		// is newly selected
		else {
		  $scope.selectedTypes.push(selectedType);
		}
		console.log($scope.selectedTypes);
	};

	/* ---------- Favorites stuff -----------------------__*/
	$scope.toggleFavorite = function (materialId) {
			for (var i = 0; i < $scope.material.length; i ++) {
					if ($scope.material[i]._id === materialId) {
							if ($scope.material[i].favoriteIcon === "fa fa-star"){
									$scope.removeFavorite(materialId);
									console.log("remove favorite");
									$scope.material[i].favoriteIcon = "fa fa-star-o";
							} else if ($scope.material[i].favoriteIcon === "fa fa-star-o"){
									$scope.addFavorite(materialId);
									console.log("add favorite");
									$scope.material[i].favoriteIcon = "fa fa-star";
							}
					}
			}
			event.stopPropagation();

	};

	$scope.addFavorite = function(materialId) {
			$scope.user.favorites.push(materialId);

			$http({method: 'PUT', url: '/user/' + $scope.userID, data: $scope.user}).
					success(function (data) {
							console.log("Added favorite: ", data);
							//$location.path("");
					})
					.error(function (data, status) {
							alert("AJAX ERROR");
							console.log("ERROR: question controller error", status, data);
					});

	};

	$scope.removeFavorite = function(materialId) {
			for (var i = 0; i < $scope.user.favorites.length; i ++){
					if( $scope.user.favorites[i] === materialId){
							$scope.user.favorites.splice(i,1);
					}
			}

			$http({method: 'PUT', url: '/user/' + $scope.userID, data: $scope.user}).
					success(function (data) {
							console.log("Deleted favorite: ", data);
							//$location.path("");
					})
					.error(function (data, status) {
							alert("AJAX ERROR");
							console.log("ERROR: question controller error", status, data);
					});

	};
};
