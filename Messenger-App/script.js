const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-row you-message')
const messageForm = document.getElementById('messageInput')
const messageInput = document.getElementById('messageInput')
const you = document.getElementById('you')
const other = document.getElementById('other')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

messageForm.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        const message = messageInput.value
        appendMessage(`You: ${message}`)
        socket.emit('send-chat-message', message)
        messageInput.value = ''
    }
});

var turnMessage = 0;
function appendMessage(message) {
    if (turnMessage == 0) {
        const messageElement = document.createElement('div')
        messageElement.setAttribute('id', 'you');
        you.innerHTML = message
        //messageContainer.append(messageElement)
        turnMessage = 1;
        return;
    }
    
    if (turnMessage == 1) {
        const messageElement = document.createElement('div')
        messageElement.setAttribute('id', 'other');
        other.innerHTML = message
        //messageContainer.append(messageElement)
        turnMessage == 0;
    }
}