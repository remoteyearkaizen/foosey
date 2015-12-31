angular.module('leaderboard', [])
  .controller('LeaderboardController', function ($scope, localStorage, $ionicSlideBoxDelegate, FooseyService) 
  {
  	// create a pull-to-refresh function
  	$scope.refresh = refresh;

  	// initialize the page
    $scope.refresh();
    $scope.slide = 0;
    $scope.loading = true;

    // function for swiping between views
    $scope.changeSlide = function(index)
    {
      $scope.slide = index;
    }

    $scope.slideTo = function(index)
    {
      $ionicSlideBoxDelegate.slide(index);
    }

    // refresh function
    function refresh()
    {
      // get elos
      getElos();
    }

    // gets the list of names and elos
    function getElos()
    {
      // load from local storage
      $scope.elos = localStorage.getObject('elos');
      $scope.avgs = localStorage.getObject('avgs');

      // load from server
      FooseyService.leaderboard().then(function successCallback(response)
      { 
        $scope.elos = response.data.elos;
        $scope.avgs = response.data.avgs;
        $ionicSlideBoxDelegate.update();
        localStorage.setObject('elos', $scope.elos);
        localStorage.setObject('avgs', $scope.avgs);
        $scope.error = false;
        
        done();
      }, function errorCallback(response)
      {
        $scope.error = true;
        done();
      });
    }

    // turns off spinner and notifies
    function done()
    {
      $scope.loading = false;
      $scope.$broadcast('scroll.refreshComplete');
    }

  });
