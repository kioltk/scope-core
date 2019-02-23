module.exports.start = PORT => {
  const Server = require("socket.io");
  const io = new Server(require("http").createServer());
  io.listen(PORT);
  this.publish = data => {
    io.sockets.emit("data", data);
  };
  return this;
};
