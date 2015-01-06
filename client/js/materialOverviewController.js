var materialOverviewController = function ($http, $scope, $routeParams, $location, $window) {
	var socket = {};
	socket = io.connect('http://localhost:3000');

	$scope.material = [];
	$scope.materialTypes = materialTypes;

    $http.get("/material")
        .success(function (data) {
						for(var i = 0; i < data.data.length; i++){
							if(data.data[i].original==null){
								$scope.material.push(data.data[i]);
							}
						}

        })
        .error(function (data, status) {
            alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });

  //Filters
	$scope.search = '';
	$scope.sort = 'id';
	$scope.sortOrder = false;
	$scope.selectedTypes = [];

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
};
