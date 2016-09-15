"use strict";
(function(){
    angular
        .module("SocketIoSampleApp")
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when("/home",{
                    templateUrl: "views/home/home.view.html",
                })
                .when("/register",{
                    templateUrl: "views/register/register.view.html",
                    controller: "RegisterController",
                    controllerAs:"model"
                })
                .when("/chat",{
                    templateUrl: "views/chat/chat.view.html",
                    controller: "ChatController",
                    controllerAs:"model"
                })
                .otherwise({
                    redirectTo: "/home"
                });

        }]);

})();
