const socket= io('https://nodejs-chat-app-w23f.onrender.com/');

const messageForm= document.getElementById('send-box');
const messageInput = document.querySelector('.message-input');
const messageContainer = document.getElementById('message-div');

const name = prompt('What is your name?');
appendMessage('You joined!!');

socket.emit('new-user', name);

socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();


    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}