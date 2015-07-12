'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:StoriesShowCtrl
 * @description
 * # StoriesShowCtrl
 * Controller of the StoriesBy2 app
 */
angular.module('StoriesBy2')
  .controller('StoriesShowCtrl', function ($scope, $routeParams, Story) {
    $scope.story = Story.get({id: $routeParams.id});
  });
