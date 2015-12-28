'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:ProfilesCreateCtrl
 * @description
 * # ProfilesCreateCtrl
 * Controller for creating a StoriesBy2 profile, for the current user.
 */
angular.module('StoriesBy2')
  .controller('ProfilesCreateCtrl',
      function ($scope, $routeParams, $location, toastr, Profile) {
    $scope.profile = new Profile();

    // Default new name to session display_name.
    if ($scope.currentSession)
      $scope.profile.display_name = $scope.currentSession.display_name;

    $scope.createProfile = function(profile) {
      $scope.error = null;
      $scope.updating = true;

      profile.$save({}, function() {
        $location.path('/');
        toastr.success('Profile @' + profile.response.handle + ' created.');
      },
      function(response) {
        $scope.error = response.data;
      }).finally(function() {
        $scope.updating = false;
      });
    };
  });
