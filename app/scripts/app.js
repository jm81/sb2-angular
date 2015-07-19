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
    'ngRoute', 'ngResource'
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
      .when('/stories', {
        templateUrl: 'views/stories/index.html',
        controller: 'StoriesIndexCtrl'
      })
      .when('/stories/:id', {
        templateUrl: 'views/stories/show.html',
        controller: 'StoriesShowCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
