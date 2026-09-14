'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('phoneDetail').
  component('phoneDetail', {
    templateUrl: 'phone-detail/phone-detail.template.html',
    controller: ['$routeParams', 'Phone',
      function PhoneDetailController($routeParams, Phone) {

        var self = this;

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };

        self.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
          self.setImage(phone.images[0]);
        });


      }
    ]
  });


  /* OLD CONTROLLER

    controller: ['$http', '$routeParams',
      function PhoneDetailController($http, $routeParams) {
        var self = this;

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };

        $http.get('phones/' + $routeParams.phoneId + '.json').then(function(response) {
          self.phone = response.data;
          self.setImage(self.phone.images[0])
        });
      }
    ]

  */