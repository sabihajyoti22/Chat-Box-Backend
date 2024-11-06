const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const https = require("https")
const { readFileSync } = require("fs");
const cors = require("cors")
const app = express()
const config = require("./Config/config")
const path = require("path")

// CORS
app.use(cors())

// Home Route
app.use("/", (req, res) => {
  res.statusCode = 200
  res.send("<h1>Home Route</h1>")
})

const server = http.createServer(app)
const httpsServer = https.createServer({
  key: readFileSync(path.join(__dirname, 'Certificate', 'key.pem')),
  cert: readFileSync(path.join(__dirname, 'Certificate', 'cert.pem'))
})

const io = new Server(httpsServer, {
    cors: {
      origin: config.app.client,
      methods: ["GET", "POST"]
    }
  }
)

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("chatRoom", chatRoom => {
    socket.join(chatRoom)
  })
  
  socket.on("newMessages", ({newMessages, chatRoom}) => {
    io.in(chatRoom).emit("getLatestMessage", newMessages)
  })
});

module.exports = httpsServer