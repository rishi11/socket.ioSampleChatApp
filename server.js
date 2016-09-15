var express = require('express');
var app = express();
var http = require('http').Server(app);
var server = require('http').createServer(app);
var q = require ("q");

var io = require('socket.io');
io = io.listen(server);

var logger = require('tracer').colorConsole({level:'info'});

/*
Port Configurations For Hosting and Localhost
*/
var PORT_NUMBER = process.env.PORT || 3000;


/*
Redirecting to index.js of Client
*/
app.use(express.static(__dirname + '/public/client/'));

/*
* Volatile array to store users
* Sample user object : sampleUser = { "userId" : "uniqueUserId", "socketId": "clientSocket.id"}
*/
var userArray = [];


/*
Connection Services.
*/
io.sockets.on('connection', function(clientSocket){
  logger.info("A new Connection : " + clientSocket.id);

  clientSocket.on("registerNewUser", function(userId){
      logger.info("registerNewUser Called : " + userId);
      if(checkForUniqueID(userId)){
        var newUser = { "userId" : userId, "socketId": clientSocket.id};
        userArray.push(newUser);
        io.sockets.sockets[clientSocket.id].emit("registerResponse", "true");
        io.sockets.emit("usersUpdate", userId + " joined chat room");
      }else{
        io.sockets.sockets[clientSocket.id].emit("registerResponse", "false");
      }
  });

  clientSocket.on("sendChatMessage", function(userId, message){
      logger.info("sendChatMessage Called : " + userId);
      var messageDetails = {"sender" : userId, "content" : message};
      io.sockets.emit("chatMessage", messageDetails);
  });

  clientSocket.on("disconnect", function(){
    logger.info("Disconnect Called");
    var userToRemove = removeUniqueID(clientSocket.id);
    if(userToRemove != undefined){
      logger.info("Disconnect", userToRemove.userId);
      io.sockets.emit("usersUpdate", userToRemove.userId + " left chat room");
    }

  });

  function checkForUniqueID(newUserId){
    logger.info("checkForUniqueID Called : " + newUserId);
    for(var i=0; i < userArray.length; i++){
      if(userArray[i].userId == newUserId){
        return false;
      }
    }
    return true;

  }

  function removeUniqueID(clientSocketId){
    logger.info("removeUniqueID Called : " + clientSocketId);
    console.log(userArray);
    for(var i=0; i<userArray.length;i++){
      var indexToSplice = -1;
      if(userArray[i].socketId == clientSocketId){
        indexToSplice = i;
      }
      if(indexToSplice > -1){
        var userToRemove = userArray[indexToSplice];
        userArray.splice(indexToSplice,1);
        console.log(userToRemove);
        return userToRemove;
      }
      return undefined;

    }
  }

});


server.listen(PORT_NUMBER);
