const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const SocketInstance = require("./src/listeners");  

const app = express();
const server = http.createServer(app);
const io = new Server(server);

SocketInstance.SocketServer(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
