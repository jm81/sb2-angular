'use strict';

describe('Resource: Story', function () {
  var $httpBackend, Story, config, author;

  // load the resource's module
  beforeEach(module('StoriesBy2'));

  // Initialize the resource and a mock scope
  beforeEach(inject(function($injector) {
    Story = $injector.get('Story');
    $httpBackend = $injector.get('$httpBackend');
    config = $injector.get('sb2Config');
    author = '"author":{"id":1,"display_name":"My Name","handle":"author1"}';
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('query', function() {
    it('gets a list of Stories', function () {
      $httpBackend.expect('GET', config.apiUrl + '1/stories')
        .respond(
          200, '{"response":[' +
            '{"id":1,"body":"a b","level":1,"words":2,' + author + '},' +
            '{"id":2,"body":"a c b d","level":2,"words":4,' + author + '}' +
          '],"count":2}'
        );

      var stories = Story.query();
      $httpBackend.flush();
      expect(stories.length).toBe(2);
      expect(stories[0].body).toBe('a b');
      expect(stories[1].body).toBe('a c b d');
    });
  });

  describe('get', function() {
    it('gets a Story by ID', function () {
      $httpBackend.expect('GET', config.apiUrl + '1/stories/2')
        .respond(
          200, '{"response":' +
            '{"id":2,"body":"a c b d","level":2,"words":4,' + author + '}' +
          '}'
        );

      var story = Story.get({id: 2});
      $httpBackend.flush();
      expect(story.body).toBe('a c b d');
      expect(story.author.handle).toBe('author1');
    });
  });
});
