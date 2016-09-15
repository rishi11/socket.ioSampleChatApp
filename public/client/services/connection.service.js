"use strict";
(function () {
    angular
        .module("SocketIoSampleApp")
        .factory("ConnectionService", ConnectionService);

    function ConnectionService($rootScope) {
        var socket;
        var registerResponse;
        var api = {
          makeConnection : makeConnection,
          registerUser : registerUser,
          listenToRegistrationResponse : listenToRegistrationResponse,
          getRequestResponse : getRequestResponse,
          getSocketForConnection : getSocketForConnection,
          sendChatMessage : sendChatMessage
        };

        return api;

        function makeConnection(){
          if(socket != null || socket != undefined){
            socket.disconnect();
          }
          socket = io.connect("https://socketiosampleapp.herokuapp.com/#/register");
        }

        function listenToRegistrationResponse(){
          socket.on("registerResponse", function(data){
            if(data != []){
              registerResponse = data;
            }
          });
        }

        function registerUser(userId){
            socket.emit("registerNewUser", userId);
        }

        function getRequestResponse(){
          return registerResponse;
        }

        function getSocketForConnection(){
          return socket;
        }

        function sendChatMessage(message, userId){
            socket.emit("sendChatMessage", userId, message);
        }

    }
})();
