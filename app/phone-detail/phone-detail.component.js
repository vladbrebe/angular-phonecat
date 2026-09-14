<<<<<<< HEAD
'use strict';

// Register `phoneDetail` component, along with its associated controller and template
=======
>>>>>>> 0e694104b90aa8d0de5fda60819877106ae67c34
angular.
  module('phoneDetail').
  component('phoneDetail', {
    templateUrl: 'phone-detail/phone-detail.template.html',
    controller: ['$http', '$routeParams',
      function PhoneDetailController($http, $routeParams) {
        var self = this;

        $http.get('phones/' + $routeParams.phoneId + '.json').then(function(response) {
          self.phone = response.data;
        });
      }
    ]
  });