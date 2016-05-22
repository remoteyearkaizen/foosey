(function()
{
  angular
    .module('login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$state', '$ionicViewService', '$ionicPopup'];

  function LoginController($scope, $state, $ionicViewService, $ionicPopup)
  {
    $scope.team = { text: '' };

    $scope.login = login;
    $scope.forgot = forgot;
    $scope.createTeam = createTeam;

    function login()
    {
      if ($scope.team.text.toLowerCase() !== 'wca-dev')
      {
        popupAlert('Invalid Team Name', '<center>You need to enter a valid <br> team name to get started.</center>');
        $scope.team.text = '';
        return;
      }

      $ionicViewService.nextViewOptions({
        disableBack: true
      });

      $state.go('app.leaderboard');
    }

    function forgot()
    {
      popupAlert('Forgot Team?', '<center>This feature isn\'t implemented yet!</center>');
    }

    function createTeam()
    {
      popupAlert('Create Team', '<center>Hey! We\'re glad you\'re interested in trying out Foosey! We are currently testing with a few teams and will be adding new teams shortly. If you\'d like us to reach out to you when we\'re ready for you to join: <div><a href="mailto:mtaylor@whitecloud.com?Subject=Foosey%20App&cc=brik@whitecloud.com&Body=Hello%2C%20I%20am%20interested%20in%20using%20Foosey%20for%20my%20team!" target="_top">Send us an email!</a></div></center>');
    }

    function popupAlert(title, template)
    {
      $ionicPopup.alert({
        title: title,
        template: template
      });
    }
  }
})();