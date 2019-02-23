const net = require("net");

module.exports.serve = (HOST, PORT, listener) => {
  net
    .createServer(function(sock) {
      console.log(
        "Receiver: connected " + sock.remoteAddress + ":" + sock.remotePort
      );
      sock.on("data", function(data) {
        try {
          const j = JSON.parse("" + data.slice(8));
          console.log("Receiver: data from " + sock.remoteAddress + ": ", j);
          listener && listener(j);
        } catch (e) {
          console.error(e);
        }
      });
      sock.on("close", function(data) {
        console.log(
          "Receiver: closed " + sock.remoteAddress + " " + sock.remotePort
        );
      });
    })
    .listen(PORT, HOST);

  console.log("Receiver: serving socket on " + HOST + ":" + PORT);
  return this;
};
