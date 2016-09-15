"use strict";
(function () {
    angular
        .module("SocketIoSampleApp")
        .factory("SessionService", SessionService);

    function SessionService($rootScope, $location) {
        var api = {
          setUserId : setUserId
        };
        return api;

        function setUserId(userId){
          $rootScope.userId = userId;
          $location.url("/chat");
        }
    }
})();
