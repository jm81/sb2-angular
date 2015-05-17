'use strict';

/**
 * @ngdoc overview
 * @name StoriesBy2
 * @description
 * # StoriesBy2
 *
 * Main module of the application.
 */
angular
  .module('StoriesBy2', [
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
