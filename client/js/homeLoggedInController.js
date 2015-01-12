var homeLoggedInController = function ($scope, $http, $routeParams, $location, $window) {
	var socket = {};
	socket = io.connect('http://localhost:3000');

	$scope.user = null;
	$scope.userID = 0;
	$scope.selectedBlocks=[];
	$scope.blocksLeft = [];

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
		document.getElementById('myAccountText').innerHTML = $scope.user.name;
		$scope.userID = data._id;
		$scope.selectedBlocks = data.blocks;
		$scope.otherBlocks();
		$scope.loginUser();
	}
	$scope.otherBlocks = function () {
		var array = [];
		for (var i = 0; i < 10; i++){
			if($scope.selectedBlocks.indexOf(i) == -1) {
				array.push(i);
			}
		}
		$scope.blocksLeft = array;
	};

	$scope.loginUser = function () {
		$http.post("/postUser/" + $scope.userID)
				.success(function (data) {
						console.log('nieuwe user: ', data);
						$scope.getMaterials();
				})
				.error(function (data, status) {
						console.log("ERROR: show question controller error", status, data);
				})
	}

	$scope.getMaterials = function () {
		$http.get("/material")
				.success(function (data) {
						//all materials
						$scope.material = data.data;
						$scope.materialByDate = $scope.material.sort(function(a,b) {return (a.publishdate > b.publishdate) ? 1 : ((b.publishdate > a.publishdate) ? -1 : 0);});
						$scope.materialByModifiedDate = $scope.material.sort(function(a,b) {return (a.modifieddate > b.modifieddate) ? 1 : ((b.modifieddate > a.modifieddate) ? -1 : 0);});
						$scope.materialRandom = $scope.shuffle($scope.material);

						//all comments
						$scope.materialRandomComment = [];
						$scope.materialWithMyComment = [];
						for(var i = 0; i<data.data.length; i++){
							for(var j = 0; j<data.data[i].comments.length; j++) {
								console.log('comment found');
								$scope.materialRandomComment.push(data.data[i].comments[j]);
							}
						}
						console.log('comments', $scope.materialRandomComment);
						$scope.materialRandomComment = $scope.shuffle($scope.materialRandomComment);
						$scope.materialWithMyComment = $scope.shuffle($scope.materialRandomComment);
				})
				.error(function (data, status) {
						alert("AJAX ERROR");
						console.log("ERROR: show question controller error", status, data);
				});
	}
	$scope.shuffle = function (o) {
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
	}

	$scope.saveBlocks = function () {
		$scope.otherBlocks();
		if($scope.userID !== 0){
			$http.put("/userblock/" + $scope.userID, {_id:$scope.userID, blocks: $scope.selectedBlocks})
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
	};
	$scope.addBlock = function (id) {
		if($scope.selectedBlocks.length < 6) {
			$scope.selectedBlocks.push(id);
		}
		$scope.saveBlocks();
	};

    $http.get("/lesson")
        .success(function (data) {
            console.log('lesson', data.data);
            $scope.lessons = data.data;
        })
        .error(function (data, status) {
            //alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });

};
