"use strict";
const buildControllers = require("./controllers");

const wrapper = (...handlers) => async (req, res, next) => {
  for (let i = 0; i < handlers.length; i += 1) {
    try {
      await handlers[i](req, res, next);
    } catch (err) {
      return errorHandler(err, res);
    }
  }
};

function errorHandler(err, res) {
  console.error(err);

  res.status(err ? err.status || 500 : 500).json({
    messages: [
      {
        code: err.code || "InternalServerError",
        message: err.message,
      },
    ],
  });
}

module.exports = function (app, opts) {
  const { usersController } = buildControllers(opts);
  app.get("/", (_, res) => res.send());
  app.post("/user", wrapper(usersController.createUser));
  app.get("/user", wrapper(usersController.getAllUsers));
  app.put("/user/:userId", wrapper(usersController.setUser));
  app.get("/user/:openPayId", wrapper(usersController.getUser));
};
