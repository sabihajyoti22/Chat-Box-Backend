const app = require("./app")
const config = require("./Config/config")
const { Server } = require("socket.io")
const PORT = config.app.port

const io = new Server({ /* options */ });

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("chatRoom", chatRoom => {
    socket.join(chatRoom)
  })
  
  socket.on("newMessages", ({newMessages, chatRoom}) => {
    io.in(chatRoom).emit("getLatestMessage", newMessages)
  })
});

io.listen(PORT)
