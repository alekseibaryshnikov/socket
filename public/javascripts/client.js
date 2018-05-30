let socket = io();

socket.on('connect', () => {
  console.log('user connected');
});

let geoButton = document.querySelector('button#send-geolocation');

if (geoButton) {
  geoButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (location) {
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
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let messageText;

    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].name === 'messageText') {
        messageText = e.target.elements[i].value;
        e.target.elements[i].value = '';
      }
    }

    socket.emit('createMessage', {
      from: 'User',
      text: messageText
    });
  });
}

socket.on('newMessage', function (message) {
  drawMessage(message);
});

socket.on('newLocationMessage', function (message) {
  drawMessage(message);
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

function drawMessage(message) {
  let chat = document.querySelector('div.chat');
  let newMessage = document.createElement('p');

  if (message.url) {
    newMessage.innerHTML = `${message.createdAt} ${message.from}: <a href="${message.url}" target="__blank">Get my coordinates!</a>`;
  } else {
    newMessage.innerHTML = `${message.createdAt} ${message.from}: ${message.text}`;
  }
  chat.appendChild(newMessage);
}