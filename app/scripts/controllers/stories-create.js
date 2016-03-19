'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:StoriesCreateCtrl
 * @description
 * # StoriesCreateCtrl
 * Controller for create a Story.
 */
angular.module('StoriesBy2')
  .controller('StoriesCreateCtrl',
      function($scope, $routeParams, $location, toastr, Story, direction) {

    $scope.story = new Story(
      {direction: direction, parent_id: $routeParams.id}
    );

    $scope.createStory = function(story) {
      $scope.error = null;
      $scope.updating = true;

      story.$save({}, function() {
        $location.path('/stories/' + story.response.id);
        toastr.success('Story saved.');
      },
      function(response) {
        $scope.error = response.data;
      }).finally(function() {
        $scope.updating = false;
      });
    };
  });
