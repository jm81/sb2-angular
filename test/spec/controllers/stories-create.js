'use strict';

describe('Controller: StoriesCreateCtrl', function() {
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
      return $controller('StoriesCreateCtrl', {
        '$scope' : $rootScope,
        'direction' : 'plus',
        '$routeParams' : { id: 2 }
      });
    };

    config = $injector.get('sb2Config');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('sets up a new Story', function() {
    expect($rootScope.story).toBeUndefined();
    createController();
    expect($rootScope.story.direction).toBe('plus');
    expect($rootScope.story.parent_id).toBe(2);
    expect($rootScope.story.body).toBeUndefined();
  });

  describe('createStory', function() {
    it('posts a new story object', function() {
      createController();
      $rootScope.story.body = 'Hello Earth';

      $httpBackend.expect(
        'POST', config.apiUrl + '1/stories',
        {direction: 'plus', parent_id: 2, body: 'Hello Earth'}
      )
      .respond(
        200,
        '{"response":{"id":1,"direction":"plus","body":"Hello Earth",' +
          '"level":1,"words":2}}'
      );

      $rootScope.createStory($rootScope.story);
      $httpBackend.flush();
      expect($rootScope.story.response.body).toBe('Hello Earth');
      expect($location.path()).toBe('/stories/1');
      expect($rootScope.updating).toBe(false);
    });

    describe('error', function() {
      it('sets error on $scope', function() {
        createController();
        $rootScope.story.body = '';

        $httpBackend.expect(
          'POST', config.apiUrl + '1/stories',
          {direction: 'plus', parent_id: 2, body: ''}
        )
        .respond(
          400,
          '{"error":"bad_request","error_description":"body is not present"}'
        );

        $rootScope.createStory($rootScope.story);
        $httpBackend.flush();
        expect($rootScope.error.error).toBe('bad_request');
        expect($rootScope.error.error_description).toBe('body is not present');
        expect($rootScope.updating).toBe(false);
      });
    });
  });
});

