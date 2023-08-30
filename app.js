const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const cors = require("cors")
const app = express()

// CORS
app.use(cors())

// Home Route
app.use("/", (req, res) => {
  res.statusCode = 200
  res.send("<h1>Home Route</h1>")
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})


io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("chatRoom", chatRoom => {
    socket.join(chatRoom)
  })
  
  socket.on("newMessages", ({newMessages, chatRoom}) => {
    io.in(chatRoom).emit("getLatestMessage", newMessages)
  })

});

module.exports = server