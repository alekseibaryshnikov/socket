let socket = io();

socket.on('connect', () => {
	deparam().result.then((result) => {
		socket.emit('join', result, (err) => {
			if (err) {
				alert(err);
				window.location.href = '/';
			} else {
				console.log('No error');
			}
		});
	});
});

let geoButton = document.querySelector('button#send-geolocation');

if (geoButton) {
	geoButton.addEventListener('click', function(e) {
		e.preventDefault();

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(location) {
				socket.emit('createLocationMessage', {
					from: 'User',
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				});
			});
		} else {
			alert('Your browser not support geolocation!');
		}
	});
}

let form = document.querySelector('form#message-form');

if (form) {
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		let messageText;

		for (let i = 0; i < e.target.elements.length; i++) {
			if (e.target.elements[i].name === 'messageText') {
				messageText = e.target.elements[i].value;
				e.target.elements[i].value = '';
			}
		}

		socket.emit('createMessage', {
			text: messageText
		});
	});
}

socket.on('updateUserList', function(users) {
	let people = document.querySelector('ol#UsersList');
	while (people.firstChild) {
		people.removeChild(people.firstChild);
	}

	let olNode = document.createElement('ol');
	users.forEach((user) => {
		let userNode = document.createElement('li');
		userNode.innerHTML = user;
		olNode.appendChild(userNode);
	});
	people.appendChild(olNode);
});

socket.on('newMessage', function(message) {
	drawMessage(message);
});

socket.on('newLocationMessage', function(message) {
	drawMessage(message);
});

socket.on('disconnect', () => {
	console.log('disconnected from server');
});

function drawMessage(message) {
	let chat = document.querySelector('div.chat');
	let newMessage = document.createElement('p');

	if (message.url) {
		newMessage.innerHTML = `${message.createdAt} <strong>${message.from}</strong>:<br/> <a href="${message.url}" target="__blank">Get my coordinates!</a>`;
	} else {
		newMessage.innerHTML = `${message.createdAt} <strong>${message.from}</strong>:<br/> ${message.text}`;
	}

	if (chat) {
		chat.appendChild(newMessage);
	}
}
