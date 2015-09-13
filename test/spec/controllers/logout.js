'use strict';

describe('Controller: LogoutCtrl', function() {
  var $httpBackend, $rootScope, createController, setupLogin, $auth, config;

  // load the controller's module
  beforeEach(module('StoriesBy2'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $auth = $injector.get('$auth');

    $rootScope = $injector.get('$rootScope');
    $rootScope.currentSession =
      {user_id: 3, display_name: 'Yoda', token: 'ABC'};
    $rootScope.setCurrentSession = function(session) {
      $rootScope.currentSession = session;
    };

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('LogoutCtrl', { '$scope' : $rootScope });
    };

    config = $injector.get('sb2Config');

    setupLogin = function() {
      $httpBackend.expect('POST', '/auth/login')
        .respond({token: 'ABC'});
      $auth.login({email: 'test@example.com', password: 'password'});
      $httpBackend.flush();
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('calls $auth.logout and logs out of API', function() {
    setupLogin();
    $httpBackend.expect('POST', config.apiUrl + '1/auth/logout').respond('');
    createController();
    $httpBackend.flush();
    expect($auth.isAuthenticated()).toBe(false);
  });

  it('set currentSession to null', function() {
    setupLogin();
    $httpBackend.expect('POST', config.apiUrl + '1/auth/logout').respond('');
    expect($rootScope.currentSession)
      .toEqual({user_id: 3, display_name: 'Yoda', token: 'ABC'});

    createController();
    $httpBackend.flush();
    expect($rootScope.currentSession).toBe(null);
  });
});
