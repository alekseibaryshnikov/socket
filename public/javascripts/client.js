let socket = io();
socket.on('connect', () => {
  console.log('user connected to server');
});

socket.on('newMessage', function(message) {
  console.log(message);
  let chat = document.querySelector('div.chat');
  let newMessage = document.createElement('p');

  newMessage.innerHTML = `${Date.now()} ${message.from}: ${message.text}`;
  chat.appendChild(newMessage);
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});