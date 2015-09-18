'use strict';

// Based on:
// https://github.com/codeschool/NoteWrangler/blob/master/app/js/directives/nw-page-nav-item.js
angular.module('StoriesBy2').
  directive('sb2PageNavItem', function($location) {
    return {
      replace: true,
      restrict: 'E',
      scope: {},
      transclude: true,
      template:
        '<li ng-class="{\'active\': isActive(pageName)}">' +
        '  <a href="#/{{pageName}}"></a>' +
        '</li>',
      link: function(scope, element, attrs, ctrl, transclude) {
        transclude(function(clonedElement) {
          scope.pageName = clonedElement.text().toLowerCase();
          element.find('a').append(clonedElement);
        });

        scope.isActive = function(pageName) {
          return $location.path().match(/\/([^\/]*)\/?/)[1] === pageName;
        };
      }
    };
  });
