"use strict";
const express = require("express");
const cors = require("cors");

const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

function unhandledError(err) {
  console.error(err);
  process.exit(1);
}

module.exports = function main(opts) {
  process.on("uncaughtException", unhandledError);
  process.on("unhandledRejection", unhandledError);

  const app = express();
  app.use(express.json());
  app.options("*", cors());
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );

  typeorm
    .createConnection({
      type: "sqlite",
      synchronize: true,
      database: "./database.sqlite",
      entities: [new EntitySchema(require("./entities/user"))],
    })
    .then((connection) => {
      opts.connection = connection;

      require("./routes")(app, opts);

      app.listen(opts.port, function (err) {
        console.info(` 🤖 Started at ${opts.host || "localhost"}:${opts.port}`);
      });
    });
};
