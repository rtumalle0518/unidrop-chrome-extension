const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const port = 4000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
	maxHttpBufferSize: 1e9,
});

io.on("connection", (socket) => {
	console.log(`User connected: ${socket.id}`);
	socket.on("create-room", (user) => {
		socket.join(user.roomId);
		console.log(`User with ID: ${socket.id} joined room: ${user.roomId}`);
	});
	socket.on("join-room", (user) => {
		socket.join(user.roomId);
		console.log(`User with ID: ${socket.id} joined room: ${user.roomId}`);
		// To the room that only has the socket that created room emit user-connected
		socket.to(user.roomId).emit("user-connected");
		socket.emit("in-room");
		io.emit("both-in-room");
	});
	socket.on("file-ready", (data, metaData) => {
		// change file-received to send-file-to-receiver
		socket.to(metaData.roomId).emit("file-received", data, metaData);
	});
	socket.on("disconnect", () => {
		console.log(`User Disconnected: ${socket.id}`);
	});
});

server.listen(process.env.PORT || port, () => {
	console.log(`Listening on port: ${port}`);
});
