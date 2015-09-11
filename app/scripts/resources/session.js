'use strict';

/**
 * @ngdoc function
 * @name StoriesBy2.factory:SessionFactory
 * @description
 * # SessionFactory
 * Session resource, including getting details, and logout.
 */
angular.module('StoriesBy2')
  .service('Session', [
    '$http', '$auth', 'sb2Config',
    function SessionFactory($http, $auth, config) {
      var authUrl = config.apiUrl + '1/auth';

      // Get session object, with user_id and display_name.
      this.get = function() {
        return $http.get(authUrl).then(function(response) {
          var responseData = response.data;
          responseData.token = $auth.getToken();
          return responseData;
        });
      };

      // Tell the API we've logged out. By this point $auth.token is probably
      // cleared so get the token from the currentSession param.
      this.logout = function(currentSession) {
        var config = { headers: {
          'Authorization': 'Bearer ' + currentSession.token
        } };
        return $http.post(authUrl + '/logout', {}, config);
      };
    }
  ]);
