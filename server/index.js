const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

//socket server listening for connection event or opening the page and logging the user by ID
socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	//disconnect event showing a user closed the browser or refreshed the page
	socket.on("disconnect", () => {
		console.log("🔥: A user disconnected");
	});
});

app.get("/api", (req, res) => {
	res.json({
		message: "Hello world",
	});
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
