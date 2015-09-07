'use strict';

angular.module('StoriesBy2')
  .config(function($authProvider, sb2Config) {
    $authProvider.github({
      clientId: 'bff77889bbcdd3a91030',
      url: sb2Config.apiUrl + 'auth/github'
    });
  });
