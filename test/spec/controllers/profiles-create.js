'use strict';

describe('Controller: ProfilesCreateCtrl', function() {
  var $httpBackend, $rootScope, $location, createController, config;

  // load the controller's module
  beforeEach(module('StoriesBy2'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('ProfilesCreateCtrl', { '$scope' : $rootScope });
    };

    config = $injector.get('sb2Config');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('sets up a new Profile', function() {
    expect($rootScope.profile).toBeUndefined();
    createController();
    expect($rootScope.profile).toBeDefined();
  });

  describe('createProfile', function() {
    it('posts a new profile object', function() {
      createController();
      $rootScope.profile.handle = 'my-handle';
      $rootScope.profile.display_name = 'First Last';

      $httpBackend.expect(
        'POST', config.apiUrl + '1/profiles',
        {handle: 'my-handle', display_name: 'First Last'}
      )
      .respond(
        200,
        '{"response":{"id":1,"handle":"my-handle","display_name":"First Last"}}'
      );

      $rootScope.createProfile($rootScope.profile);
      $httpBackend.flush();
      expect($rootScope.profile.response.handle).toBe('my-handle');
      expect($location.path()).toBe('/');
      expect($rootScope.updating).toBe(false);
    });

    describe('error', function() {
      it('sets error on $scope', function() {
        createController();
        $rootScope.profile.handle = '';
        $rootScope.profile.display_name = '';

        $httpBackend.expect(
          'POST', config.apiUrl + '1/profiles', {handle: '', display_name: ''}
        )
        .respond(
          400,
          '{"error":"bad_request","error_description":"Bad Data"}'
        );

        $rootScope.createProfile($rootScope.profile);
        $httpBackend.flush();
        expect($rootScope.error.error).toBe('bad_request');
        expect($rootScope.error.error_description).toBe('Bad Data');
        expect($rootScope.updating).toBe(false);
      });
    });
  });
});
