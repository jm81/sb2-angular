'use strict';

/**
 * @ngdoc function
 * @name sb2AngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sb2AngularApp
 */
angular.module('sb2AngularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
