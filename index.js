const app = require("express")();
const http = require("http").createServer(app);

app.get("/", (req, res) => {
  res.send("Node Server is running. Yay!!");
});

//Socket Logic
const socketio = require("socket.io")(http);

socketio.on("connection", userSocket => {
  userSocket.on("ecg_value", data => {
    console.log(data.ecgValue);
    userSocket.broadcast.emit("ecg_value_to_mobile", data);
  });
});

http.listen(3000);
