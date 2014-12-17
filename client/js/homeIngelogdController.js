var homeIngelogdController = function ($scope, $routeParams, $location, $window) {
	//var socket = {};
	//socket = io.connect('http://localhost:3000');
	$scope.blocks = homepageBlocks;
	$scope.selectedBlocks = [$scope.blocks[0],$scope.blocks[1],$scope.blocks[2],$scope.blocks[3],$scope.blocks[4],$scope.blocks[5]];
	$scope.otherBlocks = function () {
		var blocksLeft = [];
		for (var i = 0; i < $scope.blocks.length; i++){
			if($scope.selectedBlocks.indexOf($scope.blocks[i]) < 0) {
				blocksLeft.push($scope.blocks[i]);
			}
		}
		return blocksLeft;
	};
	
	$scope.removeBlock = function (id) {
		$scope.selectedBlocks.splice(id, 1);
		console.log($scope.selectedBlocks);
	};
	$scope.addBlock = function (id) {
		if($scope.selectedBlocks.length < 6) {
			$scope.selectedBlocks.push($scope.blocks[id]);
		}
	};
	
};
