'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the StoriesBy2 app
 */
angular.module('StoriesBy2')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
