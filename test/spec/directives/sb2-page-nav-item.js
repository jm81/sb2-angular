'use strict';

describe('Directive: Sb2PageNavItem', function() {
  var $compile, $rootScope;

  // load the controller's module
  beforeEach(module('StoriesBy2'));

  beforeEach(inject(function($location, _$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    spyOn($location, 'path').and.returnValue('/stories');
  }));

  it('replaces the element with a link', function() {
    var element =
      $compile('<sb2-page-nav-item>Test</sb2-page-nav-item>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('<a href="#/test">');
    expect(element.html()).toContain('Test');
  });

  describe('isActive', function() {
    it('returns whether the page matches $location.path()', function() {
      var element =
        $compile('<sb2-page-nav-item>Test</sb2-page-nav-item>')($rootScope);
      expect(element.isolateScope().isActive('stories')).toBe(true);
      expect(element.isolateScope().isActive('test')).toBe(false);
    });
  });
});
