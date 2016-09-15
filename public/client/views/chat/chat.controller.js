"use strict";
(function(){
    angular
        .module("SocketIoSampleApp")
        .controller("ChatController", ChatController);


    function ChatController(ConnectionService, $rootScope, $location) {

      if($rootScope.userId === undefined){
        $location.url("/home");
        return;
      }
      var vm = this;
      vm.status = "Logged In As : " + $rootScope.userId;
      vm.chatToDisplay = [];
      var socket = ConnectionService.getSocketForConnection();
      vm.sendChatMessage = sendChatMessage;

      socket.on("chatMessage", function(data){
        if(data != []){
          var chat = {};
          if(data.sender == $rootScope.userId){
            chat = {"type":"sentMessage","content":data.content};
          }else{
            chat = {"type":"receivedMessage","content":data.content + " - " + data.sender};
          }
          vm.chatToDisplay.push(chat);
        }
      });

      socket.on("usersUpdate", function(data){
        if(data != []){
          var chat = {"type":"update","content":data};
          vm.chatToDisplay.push(chat);
        }
      });

      function sendChatMessage(message){
        ConnectionService.sendChatMessage(message, $rootScope.userId);
      }

      }
})();
