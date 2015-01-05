var makeLessonController = function ($http, $scope, $routeParams, $location, $window) {
	var socket = {};
	socket = io.connect('http://localhost:3000');

    jQuery(document).ready(function() {
        jQuery('.tabs .tab-links a').on('click', function(e)  {
            var currentAttrValue = jQuery(this).attr('href');

            // Show/Hide Tabs
            jQuery('.tabs ' + currentAttrValue).show().siblings().hide();

            // Change/remove current tab to active
            jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

            e.preventDefault();
        });
    });

   $http.get("material")
        .success(function (data) {
            console.log(data);
			$scope.video = data.data;
            $scope.selectedVideo = data.data;
        })
        .error(function (data, status) {
            alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });

    $http.get("/material")
        .success(function (data) {
            console.log(data);
            $scope.material = data.data;
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
