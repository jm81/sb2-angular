'use strict';

describe('Controller: ApplicationCtrl', function() {
  var $httpBackend, $rootScope, createController, setupLogin, $auth, config;

  // load the controller's module
  beforeEach(module('StoriesBy2'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $auth = $injector.get('$auth');
    config = $injector.get('sb2Config');

    $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('ApplicationCtrl', { '$scope' : $rootScope });
    };

    setupLogin = function() {
      $httpBackend.expect('POST', '/auth/login').respond({token: 'ABC'});
      $auth.login({email: 'test@example.com', password: 'password'});
      $httpBackend.flush();

      $httpBackend.expect('GET', config.apiUrl + '1/auth').respond(
        200, '{"user_id":2,"display_name":"Hello World"}'
      );
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $auth.logout();
  });

  describe('isAuthenticated', function() {
    it('gets value of $auth.isAuthenticated()', function() {
      createController();
      expect($rootScope.isAuthenticated()).toBe(false);

      setupLogin();
      createController();
      $httpBackend.flush();
      expect($rootScope.isAuthenticated()).toBe(true);
    });
  });

  describe('setCurrentSession', function() {
    it('set currentSession object from API', function() {
      createController();
      expect($rootScope.currentSession).toBe(null);

      $rootScope.setCurrentSession({user_id: '3', display_name: 'Yoda'});
      expect($rootScope.currentSession)
        .toEqual({user_id: '3', display_name: 'Yoda'});
    });
  });

  describe('load after auth', function() {
    it('sets currentSession', function() {
      setupLogin();
      createController();
      $httpBackend.flush();
      expect($rootScope.isAuthenticated()).toBe(true);
      expect($rootScope.currentSession)
        .toEqual({user_id: 2, display_name: 'Hello World', token: 'ABC'});
    });
  });
});
