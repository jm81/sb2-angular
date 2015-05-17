'use strict';

/**
 * @ngdoc function
 * @name sb2AngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sb2AngularApp
 */
angular.module('sb2AngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
