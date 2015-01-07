var makeLessonController = function ($http, $scope, $routeParams, $location, $window) {
	var socket = {};
	socket = io.connect('http://localhost:3000');

    //get user iD
    $http.get("/getUser")
        .success(function (data) {
            if(!data.data){ console.log('niet ingelogd!'); $window.location = '/#/home'; } else {
                $scope.user = data.data;
                console.log("user: ", $scope.user);
                $scope.userID = data.data._id;


                $http.get("/lessonUser/" + $scope.userID)
                    .success(function (data) {
                        console.log("lesson: ", data);
                        $scope.getUsedMaterial(data);
                    })
                    .error(function (data, status) {
                        alert("AJAX ERROR");
                        console.log("ERROR: show question controller error", status, data);
                    });


            }
        });

    $scope.lessonMaterials = [{materialId: "none", type: "none"}];
    $scope.materialTypes = materialTypes;
    $scope.favoriteMaterial = [];
    $scope.myMaterial = [];
    $scope.usedMaterial = [];

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
            console.log("scope material", $scope.material);
            for (var i = 0; i < $scope.material.length; i ++) {
                $scope.material[i].favoriteIcon = "fa fa-star-o";
                for (var j = 0; j < $scope.user.favorites.length; j ++) {
                    if ($scope.material[i]._id === $scope.user.favorites[j]) {
                        console.log("match");
                        $scope.material[i].favoriteIcon = "fa fa-star";
                        $scope.favoriteMaterial.push($scope.material[i]);
                        console.log($scope.favoriteMaterial);
                    }
                }

                if ($scope.material[i].author === $scope.userID) {
                    $scope.myMaterial.push($scope.material[i]);
                }
            }


        })
        .error(function (data, status) {
            alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });

    $scope.getUsedMaterial = function (data) {
        data = data.data;
        for (var i = 0; i < data.length; i ++) {
            console.log(data[i]);
            for (var j = 0; j < data[i].material.length; j ++){
                console.log(data[i].material[j]);
                $http.get("/material/" + data[i].material[j])
                    .success(function (material) {
                        material = material.data
                        console.log("lesson: ", material);
                        $scope.usedMaterial.push(material);
                        console.log("used material: ", $scope.usedMaterial);
                    })
                    .error(function (data, status) {
                        alert("AJAX ERROR");
                        console.log("ERROR: show question controller error", status, data);
                    });

            }
        }
    };



    $scope.addMaterialLeft = function (id) {
        var oldValue;
        console.log("to the left... to the left!");
        for (var i = 0; i < $scope.lessonMaterials.length; i ++) {
            //console.log($scope.lessonMaterials[i].materialId + "  " + id);
            if ($scope.lessonMaterials[i].materialId === id) {
                if (i == 0) {

                    oldValue = $scope.lessonMaterials[0];
                    $scope.lessonMaterials.shift();
                    $scope.lessonMaterials.push(oldValue);
                    i = $scope.lessonMaterials.length;

                } else {

                    console.log("Oud: ", $scope.lessonMaterials);
                    oldValue = $scope.lessonMaterials[i - 1];
                    $scope.lessonMaterials[i - 1] = $scope.lessonMaterials[i];
                    $scope.lessonMaterials[i] = oldValue;
                    console.log("Nieuw: ", $scope.lessonMaterials);
                    i = $scope.lessonMaterials.length;
                }

            }
        }
    };

    $scope.addMaterialRight = function (id) {
        var oldValue;
        console.log("to the right... to the right!");
        for (var j = 0; j < $scope.lessonMaterials.length; j ++) {
            console.log($scope.lessonMaterials[j].materialId + "  " + id);
            if ($scope.lessonMaterials[j].materialId === id) {

                if (j + 1 === $scope.lessonMaterials.length){
                    oldValue = $scope.lessonMaterials[0];
                    $scope.lessonMaterials.pop();
                    $scope.lessonMaterials.unshift(oldValue);
                    i = $scope.lessonMaterials.length;
                } else {
                    console.log("Oud: ", $scope.lessonMaterials);
                    oldValue = $scope.lessonMaterials[j + 1];
                    $scope.lessonMaterials[j + 1] = $scope.lessonMaterials[j];
                    $scope.lessonMaterials[j] = oldValue;
                    console.log("Nieuw: ", $scope.lessonMaterials);
                    i = $scope.lessonMaterials.length;

                }

            }
        }
    };

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



    $("#saveLesson").on('click', function () {
        console.log("save");
        var materialArray = [];
        for (var i = 0; i < $scope.lessonMaterials.length; i++) {
            materialArray[i] = $scope.lessonMaterials[i].materialId
        }
        console.log(materialArray);

        var newLesson = {
            title: $('#title').val(),
            description: $('#description').val(),
            material: materialArray,
            author: $scope.userID
        };
        console.log(newLesson);

        $http({method: 'POST', url: '/lesson', data: newLesson}).
            success(function (data) {
                console.log("Added lesson: ", data);
                //$location.path("");
            })
            .error(function (data, status) {
                alert("AJAX ERROR");
                console.log("ERROR: question controller error", status, data);
            });

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
