var makeLessonController = function ($http, $scope, $routeParams, $location, $window) {
	var socket = {};
	socket = io.connect('http://localhost:3000');

    $scope.lessonMaterials = [{materialId: "none", type: "none"}];

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

    $http.get("/material")
        .success(function (data) {
            console.log(data);
            $scope.material = data.data;
        })
        .error(function (data, status) {
            alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });

    $scope.addMaterialToLesson = function(id, type) {
        console.log(id, type);
        if ($scope.lessonMaterials[0].materialId === "none") {
            $scope.lessonMaterials.splice(0,1);
        }
        $scope.lessonMaterials.push({materialId: id, type: type});

//        for (var j = 0; j < $scope.material.length; j++) {
//            console.log ($scope.material[j]._id);
//            if ($scope.material[j]._id === id) {
//                $scope.material.splice(j,1);
//
//            }
//        }



    };

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
