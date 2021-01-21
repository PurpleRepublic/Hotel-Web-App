angular.module('MEANHotel').controller('HotelsController', HotelsController)

function HotelsController (hotelDataFactory) {
    var vm = this;
    vm.title = "MEAN Hotel App"
    hotelDataFactory.hotelList().then((response)=>{
        console.log(response);
    vm.hotels = response;
    })
}