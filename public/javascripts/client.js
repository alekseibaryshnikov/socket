let socket = io();
socket.on('connect', () => {
  console.log('user connected to server');

  socket.emit('messageFromClient', {
    from: 'Client User',
    text: 'Hello from client!'
  });
});

socket.on('messageFromServer', function(message) {
  let chat = document.querySelector('div.chat');
  let newMessage = document.createElement('p');

  newMessage.innerHTML = `${Date.now()} ${message.from}: ${message.text}`;
  chat.appendChild(newMessage);
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});