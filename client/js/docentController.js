var docentController = function ($scope, $routeParams, $location, $window) {
	//var socket = {};
	//socket = io.connect('http://localhost:3000');
	$scope.blocks = [
	{
		id: 0,
		title: 'Gewijzigd materiaal',
		description: 'en hier de tekst '
	},
	{
		id: 1,
		title: 'Nieuw materiaal',
		description: 'en hier de tekst'
	},
	{
		id: 2,
		title: 'Meest bekeken les',
		description: 'en hier de tekst'
	},
	{
		id: 3,
		title: 'Nieuws',
		description: 'en hier de tekst'
	},
	{
		id: 4,
		title: 'Wat wordt er nu bekeken?',
		description: 'en hier de tekst'
	},
	{
		id: 5,
		title: 'Tagscloud',
		description: 'en hier de tekst'
	},
	{
		id: 6,
		title: 'Algemene discussie',
		description: 'en hier de tekst'
	},
	{
		id: 7,
		title: 'Gevolgde discussie',
		description: 'en hier de tekst'
	},
	{
		id: 8,
		title: 'Meest bekeken materiaal',
		description: 'en hier de tekst'
	},
	{
		id: 9,
		title: 'Nieuwe lessen',
		description: 'en hier de tekst'
	}];
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
