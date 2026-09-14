'use strict';

describe('phoneDetail', function() {

  // Load the module that contains the `phoneDetail` component before each test
  beforeEach(module('phoneDetail'));

  // Add a custom equality tester before each test, that verifies that
  // two objects are equal, but ignores any $$-prefixed (and $-prefixed,
  // e.g. `$promise`/`$resolved` from $resource) properties
  beforeEach(function() {
    jasmine.addMatchers({
      toEqualData: function(util) {
        return {
          compare: function(actual, expected) {
            return {pass: angular.equals(actual, expected)};
          }
        };
      }
    });
  });

  // Test the controller
  describe('PhoneDetailController', function() {
    var $httpBackend, ctrl;

    beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond({name: 'phone xyz', images: []});

      $routeParams.phoneId = 'xyz';

      ctrl = $componentController('phoneDetail');
    }));

    it('should fetch the phone details', function() {
      expect(ctrl.phone).toEqualData({});

      $httpBackend.flush();
      expect(ctrl.phone).toEqualData({name: 'phone xyz', images: []});
    });

  });

});
