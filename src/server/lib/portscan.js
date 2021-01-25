import * as net from "net";
import * as async from "async";
var Socket = net.Socket;

var sock = function(host, port, cb) {
  var socket = new Socket();
  socket.setTimeout(200);
  socket.on("connect", function() {
    socket.end();
    cb && cb(null, port);
  });
  socket.on("timeout", function() {
    socket.destroy();
    cb && cb(new Error("timeout"), port);
  });
  socket.on("error", function(err) {
    cb && cb(err, host);
  });
  socket.on("close", function() {});
  socket.connect(port, host);
};

export var portscan = function(ip, ports, callback) {
  async.mapSeries(
    ports,
    (item, next) => {
      sock(ip, item, function(err, res) {
        if (!err) {
          next(null, res);
        } else {
          next(null, null);
        }
      });
    },
    (err, res) => {
      callback(null, res);
    }
  );
};
