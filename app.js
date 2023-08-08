const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const cors = require("cors")
const app = express()

// CORS
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  // cors: {
  //   origin: "https://chat-box-app-2022.netlify.app/",
  //   methods: ["GET", "POST"]
  // }
})
// Home Route
app.use("/", (req, res) => {
  res.statusCode = 200
  res.send("<h1>Home Route</h1>")
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