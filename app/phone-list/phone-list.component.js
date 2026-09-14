'use strict';

// Register `phoneList` component, along with its associated controller and template
// No scope inheritance from root scope
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['$http',
      function PhoneListController($http) {
        var self = this;
        self.orderProp = 'age';

        //  $http.get('phones/phones.json').then(
        //    self.phones = response.data;
        //   );
        // doesn't work, because .then() wants to invoke the function inside
        // also, need a way to parse the `response` from .get()
        $http.get('phones/phones.json').then(function(response) {
          self.phones = response.data
        });
      }
    ] // as an array to avoid minification
  });