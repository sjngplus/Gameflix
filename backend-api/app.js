const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const http = require('http');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search');
const loginRouter = require('./routes/login');

const app = express();

const port = process.env.PORT || '3010';
app.set('port', port);

const server = http.createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname+"/frontend-client/build"))
app.use(cors({
  origins: ['http://localhost:3000/', 'https://gameflix-frontend-react.herokuapp.com/']
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/api/search', searchRouter);

server.listen(port);
server.on('listening', onListening);

//Socket.io config
const io = require("socket.io")(server, {  
  cors: {    
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"]    
  }
});

//Socket.io logic
io.on('connection', (socket) => {
  const connectedClients = io.engine.clientsCount
  io.emit("number-of-clients", connectedClients);
  console.log("Clients connected:", connectedClients);
  console.log('::::user connected:', socket.id);
  socket.on('filter-state', (filterData) => {
    socket.broadcast.emit('filter-state', filterData);
  });

  socket.on('highlight-game', (highlightData) => {
    socket.broadcast.emit('highlight-game', highlightData);
  });
    
  socket.on('disconnect', () => {
    const connectedClients = io.engine.clientsCount
    io.emit("number-of-clients", connectedClients);
    console.log("Clients connected:", connectedClients);
    console.log(':user disconnected:', socket.id)
  });
});

function onListening() { 
  console.log(`Server listening on port ${port}`)
}

module.exports = io;