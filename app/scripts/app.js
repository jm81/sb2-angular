'use strict';

/**
 * @ngdoc overview
 * @name sb2AngularApp
 * @description
 * # sb2AngularApp
 *
 * Main module of the application.
 */
angular
  .module('sb2AngularApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
