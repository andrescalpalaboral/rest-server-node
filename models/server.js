const express = require("express");
const cors = require("cors");
const { environmentVariables } = require("../config");

class Server {
  constructor() {
    this.app = express();
    this.port = environmentVariables.port;

    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/hello", function (req, res) {
      res.status(200).json({
        msg: "GET",
      });
    });

    this.app.post("/hello", function (req, res) {
      res.status(201).json({
        msg: "POST",
      });
    });

    this.app.put("/hello", function (req, res) {
      res.status(400).json({
        msg: "PUT",
      });
    });

    this.app.patch("/hello", function (req, res) {
      res.status(401).json({
        msg: "PATCH",
      });
    });

    this.app.delete("/hello", function (req, res) {
      res.status(500).json({
        msg: "DELETE",
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
