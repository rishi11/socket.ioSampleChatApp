"use strict";
(function(){
    angular
        .module("SocketIoSampleApp")
        .controller("MainController", MainController);


    function MainController($location, $scope, ConnectionService) {
        ConnectionService.makeConnection();
        ConnectionService.listenToRegistrationResponse();
        $scope.$location = $location;
        var path = $location.path();
      }
})();
