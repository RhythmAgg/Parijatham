const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:19006",
  },
});

io.on('connection', (socket) => {
  logger.info(`a user connected ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(data.room);
    socket.join(data.room);});

  socket.on("s_message", (data) => {
    socket.to(data.room).emit("r_message", data);
    console.log(data);
  })

  socket.on('disconnect', () => {
    logger.info('user disconnected');
  });
})

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })