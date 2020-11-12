// Client side for browser

// Initialize socket on local ip address.
const socket = io("http://localhost:65080");

// Define references for HTML components.
const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

// Prompts user to input a username when entering a room.
if (messageForm != null) {
  const name = prompt("What is your name?");
  appendMessage("You joined");

  // Tell the server that a specific user has joined a specific room.
  socket.emit("new-user", roomName, name);

  // Whenever a user presses enter after typing something, send the message
  // and where it came from to the server.
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", roomName, message);
    messageInput.value = "";
  });
}

// Append newly created room link to website home page.
socket.on("room-created", (room) => {
  document.getElementById("Username") = room;
  const roomElement = document.createElement("div");
  roomElement.setAttribute("id", "you");
  roomElement.setAttribute("class", "message-text");
  roomElement.innerHTML = room;
  document.getElementById("you").append(messageElement);

  const roomLink = document.createElement("a");
  roomLink.href = `/${room}`;
  roomLink.innerText = "join";
  roomContainer.append(roomElement);
  roomContainer.append(roomLink);
});

// Receives user message from server and displays it.
socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

// Receives user connection from server and displays it.
socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

// Receives user disconnection from server and displays it.
socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

// Appends text to chat log
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;

  document.getElementById("message-container").appendChild(messageElement);
}
