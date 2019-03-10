const express = require('express');
const app = express();
const applySettings = require('./applySettings');
const applyMiddleware = require('./applyMiddleware');
const wireUpRoutes = require('./wireUpRoutes');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000 || process.env.PORT;

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('test', 'hello from server');
});

applySettings(app);
applyMiddleware(app);
wireUpRoutes(app, io);

// app.get('/', function(req, res, next) {
// 	res.sendFile(path.join(__dirname, './dist/index.html'));
// });

// app.get('/angular', function(req, res, next) {
// 	res.sendFile(path.join(__dirname, './dist/angular/index.html'));
// });

// app.get('/react', function(req, res, next) {
// 	res.sendFile(path.join(__dirname, './dist/react/index.html'));
// });

http.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});
