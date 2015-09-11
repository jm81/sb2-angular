'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.factory:StoryFactory
 * @description
 * # StoryFactory
 * Story resource
 */
angular.module('StoriesBy2')
  .factory('Story', [
    '$resource', 'sb2Config', function StoryFactory($resource, config) {
      return $resource(
        config.apiUrl + '1/stories/:id', {}, {
          query: {
            isArray: true,
            method: 'GET',
            transformResponse: function(data) {
              return angular.fromJson(data).response;
            }
          },
          get: {
            method: 'GET',
            transformResponse: function(data) {
              return angular.fromJson(data).response;
            }
          }
        }
      );
    }
  ]);
