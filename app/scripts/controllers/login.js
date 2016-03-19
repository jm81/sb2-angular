'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Authentication, using satellizer
 */
angular.module('StoriesBy2')
  .controller('LoginCtrl',
    function ($scope, $auth, $location, toastr, Session) {
      $scope.authenticate = function(provider) {
        $auth.authenticate(provider).then(function() {
          toastr.success('You have successfully signed in with ' + provider);
          Session.get().then(function(data) {
            $scope.setCurrentSession(data);
            if (!($scope.currentSession.profile_id)) {
              $location.path('/profiles/new');
            }
          });
        });
      };
    }
  );
