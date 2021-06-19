const express = require("express");
const cors = require("cors");
const { environmentVariables } = require("../config");
const { dbMongoConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = environmentVariables.port;
    this.usersPath = "/api/users";

    this.connectMongoDB();
    this.middleware();
    this.routes();
  }

  async connectMongoDB() {
    await dbMongoConnection();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
