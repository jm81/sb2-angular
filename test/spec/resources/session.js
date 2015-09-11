'use strict';

describe('Factory: Session', function() {
  var $httpBackend, Session, config;

  // load the factory's module
  beforeEach(module('StoriesBy2'));

  // Initialize the resource and a mock scope
  beforeEach(inject(function($injector) {
    Session = $injector.get('Session');
    $httpBackend = $injector.get('$httpBackend');
    config = $injector.get('sb2Config');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('get', function() {
    it('sets up a Promise to get Session data from API', function() {
      $httpBackend.expect('GET', config.apiUrl + '1/auth').respond(
        200, '{"user_id":2,"display_name":"Hello World"}'
      );

      var session;
      Session.get().then(function(data) {
        session = data;
      });
      $httpBackend.flush();
      expect(session.user_id).toBe(2);
      expect(session.display_name).toBe('Hello World');
    });
  });

  describe('logout', function() {
    it('posts logout to API', function() {
      var currentSession = { token: 'ABC' }

      $httpBackend.expectPOST(
        config.apiUrl + '1/auth/logout', undefined, function(headers) {
          return headers['Authorization'] == 'Bearer ABC';
        }).respond(200);

      Session.logout(currentSession);
      $httpBackend.flush();
    });
  });
});
