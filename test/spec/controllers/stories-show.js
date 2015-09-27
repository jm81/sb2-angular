'use strict';

describe('Controller: StoriesShowCtrl', function () {
  var $httpBackend, $rootScope, createController, config, author;

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
    author = '"author":{"id":1,"display_name":"My Name","handle":"author1"}';
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach a story to the scope', function () {
    $httpBackend.expect('GET', config.apiUrl + '1/stories/1')
      .respond(
        200, '{"response":' +
          '{"id":1,"body":"a b","level":1,"words":2,' + author + '}' +
        '}'
      );

    createController();
    $httpBackend.flush();
    expect($rootScope.story.body).toBe('a b');
    expect($rootScope.story.author.handle).toBe('author1');
  });
});
