const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { generateMessage, generateLocationMessage } = require('./server/utils/message');
const { isRealString } = require('./server/utils/validation');
const { Users } = require('./server/utils/users');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat');

let users = new Users();

io.on('connection', function(socket) {
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required!');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUsersList(params.room));

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat!'));

		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		callback();
	});

	socket.on('createMessage', (message) => {
		let user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
	});

	socket.on('createLocationMessage', (message) => {
		let user = users.getUser(socket.id);

		if (user) {
			io
				.to(user.room)
				.emit('newLocationMessage', generateLocationMessage(user.name, message.latitude, message.longitude));
		}
	});

	socket.on('disconnect', () => {
		let user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `User ${user.name} has left.`));
		}
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
app.use('/chat', chatRouter);
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

http.listen(3000, function() {
	console.log('listening on *:3000');
});

module.exports = app;
