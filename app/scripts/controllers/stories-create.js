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
      function($scope, $routeParams, $location, $http, $timeout,
        sb2Config, toastr, Story, direction) {

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

    $scope.changed = true;
    $scope.lastCheck = false;

    $scope.bodyChanged = function() {
      $scope.changed = true;
    }

    $scope.checkWordCount = function(story) {
      $timeout(function() { $scope.checkWordCount(); }, 1000);

      if ($scope.changed) {
        $scope.changed = false;

        $http.post(
          sb2Config.apiUrl + '1/stories/word_count', $scope.story
        ).then(function(response) {
          $scope.wordCount = response.data.response;
          $scope.story.level = response.data.response.level;
        });
      }
    };

    $scope.checkWordCount();
  });
