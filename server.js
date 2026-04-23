const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

let state = {};

io.on("connection", (socket) => {
  console.log("cliente conectado");

  socket.emit("estado", state);

  socket.on("update", (data) => {
    state = data;
    io.emit("estado", state);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Servidor corriendo");
});