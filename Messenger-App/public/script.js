const socket = io('https://crisco-chatroom.uc.r.appspot.com');
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')



if (messageForm != null) {
  const name = prompt('What is your name?')
  appendMessage('You joined')
  socket.emit('new-user', roomName, name)
  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}


socket.on('room-created', room => {
  document.getElementById('Username') = room;
  const roomElement = document.createElement('div');
  roomElement.setAttribute('id', 'you');
  roomElement.setAttribute('class', 'message-text')
  roomElement.innerHTML = room
  document.getElementById('you').append(messageElement);
  
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

/*
messageInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        const message = messageInput.value
        appendMessage(`You: ${message}`, "")
        socket.emit('send-chat-message', message)
        messageInput.value = ''
    }
});*/


function appendMessage(message) {
  
        const messageElement = document.createElement('div');
        messageElement.innerText = message;

        document.getElementById('message-container').appendChild(messageElement);
  /*
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)*/
}
