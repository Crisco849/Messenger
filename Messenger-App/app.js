"use strict";
// Express is used as a dependency for NodeJS HTML/Javascript pages.
// NodeJS and Express dependency files are stored on virtual machine.
// Express is initialized here.
const express = require("express");
const app = express();
// Initializing http server
const server = require("http").Server(app);
// Initializing server socket functionality with socket.io
const io = require("socket.io")(server);
server.listen(65080);

// Express view engine initialization.
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Expanding array that stores created rooms.
const rooms = {};
var count = 0;

// Uses express engine to render the home page 'index.ejs'
app.get("/", (req, res) => {
  res.render("index", { rooms: rooms });
});

// Receives room creation event from client side.
app.post("/room", (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect("/");
  }
  // store newly created room and initialize an expanding array of users.
  rooms[req.body.room] = { users: {} };
  res.redirect(req.body.room);
  // Send message to the client that the new room was successfully created
  io.emit("room-created", req.body.room);
});

app.get("/:room", (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect("/");
  }
  res.render("room", { roomName: req.params.room });
});

//PORT

// Processes data from individual clients and delivers that data to the rest of the users in the room.
io.on("connection", (socket) => {
  socket.on("new-user", (room, name) => {
    socket.join(room);
    rooms[room].users[socket.id] = name;
    socket.to(room).broadcast.emit("user-connected", name);
    count++;
  });
  socket.on("send-chat-message", (room, message) => {
    socket.to(room).broadcast.emit("chat-message", {
      message: message,
      name: rooms[room].users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
    getUserRooms(socket).forEach((room) => {
      socket
        .to(room)
        .broadcast.emit("user-disconnected", rooms[room].users[socket.id]);
      delete rooms[room].users[socket.id];
      if (count != 0) {
        count--;
      }
      if (count == 0) {
        delete rooms[room];
      }
    });
  });
});

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

module.exports = server;
