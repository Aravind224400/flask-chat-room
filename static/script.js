const socket = io();

socket.emit('join', { room: room, username: username });

document.getElementById('chat-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const msgInput = document.getElementById('message');
    const msg = msgInput.value;
    if (msg.trim() === '') return;
    socket.emit('message', { msg: msg, room: room });
    msgInput.value = '';
});

socket.on('message', function (data) {
    const chatBox = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<strong>[${data.timestamp}] ${data.username}:</strong> ${data.msg}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on('status', function (data) {
    const chatBox = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<em>${data}</em>`;
    chatBox.appendChild(div);
});
