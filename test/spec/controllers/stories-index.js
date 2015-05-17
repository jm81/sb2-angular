'use strict';

describe('Controller: StoriesIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('StoriesBy2'));

  var StoriesIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoriesIndexCtrl = $controller('StoriesIndexCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of stories to the scope', function () {
    expect(scope.stories.length).toBe(2);
  });
});
