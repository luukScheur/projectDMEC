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

                $scope.videos[i].matches = matches;

                console.log("matches"+ $scope.videos[i].matches);

                if($scope.videos[i]._id == $routeParams.id){
                    $scope.videos.splice(i,i);
                }

            }

            console.log($scope.videos);

            function compare(a,b) {
                if (a.matches < b.matches)
                    return -1;
                if (a.matches > b.matches)
                    return 1;
                return 0;
            }

            $scope.videos.sort(compare).reverse();

            if ($scope.videos.length > 10 ) {

                $scope.videos.splice(10, $scope.videos.length);
            }

        })
        .error(function (data, status) {
            alert("AJAX ERROR");
            console.log("ERROR: show question controller error", status, data);
        });



};
