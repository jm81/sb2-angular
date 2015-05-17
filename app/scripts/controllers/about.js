'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the StoriesBy2 app
 */
angular.module('StoriesBy2')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
