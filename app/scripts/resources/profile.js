'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.factroy:ProfileFactory
 * @description
 * # ProfileFactory
 * Profile for a user or collection of users.
 */
angular.module('StoriesBy2')
  .factory('Profile', [
    '$resource', 'sb2Config', function ProfileFactory($resource, config) {
      return $resource(config.apiUrl + '1/profiles/:id', {}, {
        save: {
          method: 'POST'
        }
      });
    }
  ]);
