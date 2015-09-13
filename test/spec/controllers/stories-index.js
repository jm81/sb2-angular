'use strict';

describe('Controller: StoriesIndexCtrl', function () {
  var $httpBackend, $rootScope, createController, config;

  // load the controller's module
  beforeEach(module('StoriesBy2'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('StoriesIndexCtrl', { '$scope' : $rootScope });
    };

    config = $injector.get('sb2Config');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach a list of stories to the scope', function () {
    $httpBackend.expect('GET', config.apiUrl + '1/stories')
      .respond(
        200, '{"response":[' +
          '{"id":1,"parent_id":null,"body":"a b","level":1,"words":2},' +
          '{"id":2,"parent_id":1,"body":"a c b d","level":2,"words":4}' +
        '],"count":2}'
      );

    createController();
    $httpBackend.flush();
    expect($rootScope.stories.length).toBe(2);
    expect($rootScope.stories[0].body).toBe('a b');
    expect($rootScope.stories[1].body).toBe('a c b d');
  });
});
