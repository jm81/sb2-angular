'use strict';

describe('Resource: Profile', function () {
  var $httpBackend, Profile, config;

  // load the resource's module
  beforeEach(module('StoriesBy2'));

  // Initialize the resource and a mock scope
  beforeEach(inject(function($injector) {
    Profile = $injector.get('Profile');
    $httpBackend = $injector.get('$httpBackend');
    config = $injector.get('sb2Config');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('save', function() {
    it('posts profile data', function() {
      $httpBackend.expect('POST', config.apiUrl + '1/profiles')
        .respond(
          200, '{"response":' +
            '{"id":1,"display_name":"My Name","handle":"handle02"}' +
          '}'
        );

      var profile = Profile.save(
        {display_name: 'My Name', handle: 'handle02'}
      );
      $httpBackend.flush();
    });
  });
});
