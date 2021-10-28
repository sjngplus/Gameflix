const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const http = require('http');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search');

const app = express();

const port = process.env.PORT || '3010';
app.set('port', port);

const server = http.createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origins: ['http://localhost:3000/']
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/search', searchRouter);

server.listen(port);
server.on('listening', onListening);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('::::user connected:', socket.id);
  socket.on('disconnect', () => console.log(':user disconnected:', socket.id));
});

function onListening() { 
  console.log(`Server listening on port ${port}`)
}