'use strict';

describe('Controller: StoriesShowCtrl', function () {
  var $httpBackend, $rootScope, $routeParams, createController, config;

  // load the controller's module
  beforeEach(module('StoriesBy2'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('StoriesShowCtrl', {
        '$scope' : $rootScope,
        '$routeParams': {id: '1'}
      });
    };

    config = $injector.get('sb2Config');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach a story to the scope', function () {
    $httpBackend.expect('GET', config.apiUrl + '1/stories/1')
      .respond(
        200, '{"response":' +
          '{"id":1,"parent_id":null,"body":"a b","level":1,"words":2}' +
        '}'
      );

    createController();
    $httpBackend.flush();
    expect($rootScope.story.body).toBe('a b');
  });
});
