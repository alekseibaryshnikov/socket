const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const SocketIO = require('socket.io');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { generateMessage, generateLocationMessage } = require('./server/utils/message');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user connected!'));

  socket.on('createMessage', (message) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('createLocationMessage', (message) => {
    io.emit('newLocationMessage', generateLocationMessage(message.from, message.latitude, message.longitude));
  });

  socket.on('disconnect', () => {
    console.log('a user dicsonnected');
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.use('/popper', express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd/')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

module.exports = app;
