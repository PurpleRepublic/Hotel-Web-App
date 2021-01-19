//contains our routing for our Angular App
angular.module("MEANHotel", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'angular-app/hotel-list/hotels.html',
            controller : HotelsController,
            controllerAs : 'vm'
        })
        .when('/hotels/:id', {
            templateUrl : 'angular-app/hotel-display/hotel.html',
            controller : HotelController,
            controllerAs : 'vm'
        });
}
