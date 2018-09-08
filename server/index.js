var express = require('express');
var app = express();
var applySettings = require('./applySettings');
var applyMiddleware = require('./applyMiddleware');
var wireUpRoutes = require('./wireUpRoutes');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 3000;

io.on('connection', function(socket){
  console.log('a user connected');
  // io.emit('test', 'hello from server');
});

applySettings(app);
applyMiddleware(app);
wireUpRoutes(app, io);

http.listen(port);

// app.listen(port, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("server running ...");
//     open(`http://localhost:${port}/`);
//   }
// });
