var videoController = function ($http, $scope, $routeParams, $location, $window) {
	var socket = {};
	socket = io.connect('http://localhost:3000'),
    $scope.selectedVideo;

   $http.get("/video/" + $routeParams.id)
        .success(function (data) {
            console.log(data);
						$scope.video = data.data;
            $scope.selectedVideo = data.data;
        })
        .error(function (data, status) {
            alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });

    $http.get("/video")
        .success(function (data) {
            console.log(data);


            console.log($scope.selectedVideo.tags);
            $scope.videos = data.data;


            for (var i = 0; i < $scope.videos.length; i++) {
                console.log($scope.videos[i].tags);
                var matches = 0;

                for (var j =0; j < $scope.videos[i].tags.length; j++) {
                    if ($.inArray($scope.videos[i].tags[j], $scope.selectedVideo.tags) >= 0) {
                        console.log($.inArray($scope.videos[i].tags[j], $scope.selectedVideo.tags));
                        matches += 1;
                    }
                }

                console.log(matches + " >= " + Math.ceil($scope.videos[i].tags.length / 2));

                if($scope.videos[i]._id == $routeParams.id || matches >! Math.ceil($scope.videos[i].tags.length / 2)){
                    console.log("splice");
                    $scope.videos.splice(i,i);
                }

            }
        })
        .error(function (data, status) {
            alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });



};
