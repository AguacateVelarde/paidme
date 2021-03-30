"use strict";
const PaidmeServices = require("../services");
const UsersController = require("./users");

function buildControllers(opts) {
  const services = new PaidmeServices(opts);

  const usersController = new UsersController(services.usersService);

  return {
    usersController,
  };
}

module.exports = buildControllers;
