'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:StoriesIndexCtrl
 * @description
 * # StoriesIndexCtrl
 * Controller of the StoriesBy2 app
 */
angular.module('StoriesBy2')
  .controller('StoriesIndexCtrl', function ($scope) {
    $scope.stories = [
      'First',
      'Second'
    ];
  });
