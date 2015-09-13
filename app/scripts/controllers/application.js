'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:ApplicationCtrl
 * @description
 * # NavbarCtrl
 * Setup for the StoriesBy2 Navbar, particularly authentication.
 */
angular.module('StoriesBy2')
  .controller('ApplicationCtrl', function ($scope, $auth, Session) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    // an instance of the Session factory.
    $scope.currentSession = null;

    // Set currentSession, such as at login.
    $scope.setCurrentSession = function (session) {
      $scope.currentSession = session;
    };

    // Check if a user isAuthenticated upon initialization. If so, set
    // currentSession.
    if ($auth.isAuthenticated()) {
      Session.get().then(function(data) {
        $scope.setCurrentSession(data);
      });
    }
  });
