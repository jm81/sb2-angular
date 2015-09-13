'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Authentication, using satellizer
 */
angular.module('StoriesBy2')
  .controller('LoginCtrl', function ($scope, $auth, Session) {
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function() {
        Session.get().then(function(data) {
          $scope.setCurrentSession(data);
        });
      });
    };
  });
