"use strict";
const httpErrors = require("http-errors");

class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  getUser = async (req, res) => {
    const { openPayId } = req.params;
    if (!openPayId) {
      throw new httpErrors(400, {
        code: 400,
        message: "openPayId is mandatory ",
      });
    }

    const response = await this.usersService.getCardsByOpenPay(openPayId);

    res.status(200).json({
      status: "Success",
      message: response,
    });
  };

  createUser = async (req, res) => {
    if (!req.body.user) {
      throw new httpErrors(400, { code: 400, message: "user is mandatory" });
    }
    const response = await this.usersService.createUser(req.body.user);

    res.status(201).json({
      status: "Success",
      message: response,
    });
  };

  getAllUsers = async (req, res) => {
    const response = await this.usersService.getUsers();

    res.status(200).json({
      status: "Success",
      message: response,
    });
  };

  setUser = async (req, res) => {
    const { userId } = req.params;
    const { card } = req.body;

    if (!userId || !card) {
      throw new httpErrors(400, {
        code: 400,
        message: "userId is mandatory and token",
      });
    }

    const response = await this.usersService.addNewToken(userId, card);

    res.status(200).json({
      status: "Success",
      message: response,
    });
  };
}

module.exports = UsersController;
