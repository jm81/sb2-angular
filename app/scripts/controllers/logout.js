'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Logout, using satellizer
 */
angular.module('StoriesBy2')
  .controller('LogoutCtrl', function($scope, $auth, Session) {
    if (!$auth.isAuthenticated()) { return; }

    $auth.logout().then(function() {
      Session.logout($scope.currentSession).then(function() {
        $scope.setCurrentSession(null);
      });
    });
  });
