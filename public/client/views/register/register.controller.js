"use strict";
(function(){
    angular
        .module("SocketIoSampleApp")
        .controller("RegisterController", RegisterController);


    function RegisterController($interval, ConnectionService, SessionService) {
      var vm = this;
      vm.registerUser = registerUser;
      vm.requestResponse;
      vm.userId;
      vm.error = "This userID is not available. Please choose some other.";
      vm.errorDisplay = false;

      $interval(checkForRequestResponse, 500);

        function registerUser(userId){
          if(userId == "" || userId == null){
            return;
          }
            vm.userId = userId;
            ConnectionService.registerUser(userId);
        }

        function checkForRequestResponse(){
          vm.requestResponse = ConnectionService.getRequestResponse();
          if(vm.requestResponse != undefined){
            if(vm.requestResponse == "true"){
                SessionService.setUserId(vm.userId);
            }
            else{
               vm.errorDisplay = true;
            }
          }
        }

      }
})();
