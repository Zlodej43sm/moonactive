const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT;
const routers = require("./routers");
const { promotionEditDialog } = require("./sockets");

require("./db");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan(process.env.LOGGER));

for (const route in routers) {
  routers[route](app);
}

http.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

io.on("connection", function (socket) {
  promotionEditDialog(socket);
});
