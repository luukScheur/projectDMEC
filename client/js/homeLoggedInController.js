var homeLoggedInController = function ($scope, $http, $routeParams, $location, $window) {
	var socket = {};
	socket = io.connect('http://localhost:3000');

	$scope.user = null;
	$scope.userID = 0;
	$scope.selectedBlocks=[];
	$scope.blocks = homepageBlocks;
	// get all users
	$http.get("/user")
			.success(function (data) {
					// make current user alive (first in user db)
					$scope.users = data.data;
					//check if user is already logged in
					$http.get("/getUser")
							.success(function (data2) {
									console.log(data2.data);
									if(data2.data){
											console.log('user is al ingelogd!');
											$scope.registerUser(data2.data);
										} else {
											console.log('user is nog niet ingelogd!');
											$scope.registerUser(data.data[0]);
										}
								});
			})
			.error(function (data, status) {
					console.log("ERROR: show question controller error", status, data);
			});





	$('#selectUser').change(function() {
		//switch from user (login other user too)
		$scope.userID = $('#selectUser').val();
		$http.get("/user/" + $scope.userID)
				.success(function (data) {
						$scope.registerUser(data.data);
				})
				.error(function (data, status) {
						console.log("ERROR: show question controller error", status, data);
				});
	});

	$scope.registerUser = function(data){
		$scope.user = data;
		$scope.userID = data._id;
		$scope.selectedBlocks = [];
		for(var i=0; i < data.blocks.length; i++){
			$scope.selectedBlocks.push($scope.blocks[data.blocks[i]]);
		}
		$scope.loginUser();
	}

	$scope.loginUser = function () {
		$http.post("/postUser/" + $scope.userID)
				.success(function (data) {
						console.log(data);
				})
				.error(function (data, status) {
						console.log("ERROR: show question controller error", status, data);
				})
	}
	$scope.otherBlocks = function () {
		var blocksLeft = [];
		for (var i = 0; i < $scope.blocks.length; i++){
			if($scope.selectedBlocks.indexOf($scope.blocks[i]) < 0) {
				blocksLeft.push($scope.blocks[i]);
			}
		}
		return blocksLeft;
	};
	$scope.saveBlocks = function () {
		var numberBlocks = [];
		for(var i = 0; i<$scope.selectedBlocks.length; i++){
			numberBlocks.push($scope.selectedBlocks[i].id);
		}
		if($scope.userID !== 0){
			$http.put("/userblock/" + $scope.userID, {_id:$scope.userID, blocks: numberBlocks})
				.success(function (data) {
						console.log(data);
				})
				.error(function (data, status) {
						console.log("ERROR: show question controller error", status, data);
				}
			);
		}
	}
	$scope.removeBlock = function (id) {
		$scope.selectedBlocks.splice(id, 1);
		$scope.saveBlocks();
		console.log($scope.selectedBlocks);
	};
	$scope.addBlock = function (id) {
		if($scope.selectedBlocks.length < 6) {
			$scope.selectedBlocks.push($scope.blocks[id]);
		}
		$scope.saveBlocks();
	};

};
