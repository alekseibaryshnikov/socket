let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let SocketIO = require('socket.io');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
let http = require('http').Server(app);

var io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');

  socket.emit('welcomeMessage', {
    from: 'Admin',
    text: 'Welcome to chat!'
  });

  socket.broadcast.emit('newUser', {
    from: 'Admin',
    text: 'New user connected!'
  });

  socket.on('createMessage', (message) => {
    console.log(JSON.stringify(message));
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = app;
