angular.module('MEANHotel').component('hotelRating', {
    bindings: {
      stars: '='
    },
    template: '<i class="fa fa-star fa-fw" ng-repeat="star in vm.stars track by $index" ></i> ',
    controller: 'HotelController',
    controllerAs: 'vm'
  });