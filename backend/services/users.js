"use strict";

const { IsNull, Not } = require("typeorm");

class UsersService {
  constructor(connection, openPayPaidMe) {
    this.connection = connection;
    this.openPayPaidMe = openPayPaidMe;
  }

  createUser = async (user) => {
    const userRespository = this.connection.getRepository("User");
    const customer = await this.openPayPaidMe.createCustomer(user);

    const savedUser = await userRespository.save({
      ...user,
      openPayClientId: customer.id,
    });

    return {
      customer,
      user: savedUser,
    };
  };

  getUsers = async () => {
    const userRespository = this.connection.getRepository("User");
    const users = await userRespository.find({
      where: {
        openPayClientId: Not(IsNull()),
      },
    });
    for (let user of users) {
      const cards = await this.openPayPaidMe.findCardsByCustomer(
        user.openPayClientId
      );
      user.cards = cards;
    }

    return {
      users,
    };
  };

  addNewToken = async (
    userId,
    { expirationMonth, expirationYear, card, cvv2 }
  ) => {
    const userRespository = this.connection.getRepository("User");
    const user = await userRespository.findOne(userId);

    const _card = await this.openPayPaidMe.createNewToken({
      customerId: user.openPayClientId,
      name: user.name,
      lastName: user.lastName,
      expirationMonth,
      expirationYear,
      card,
      cvv2,
    });

    return _card;
  };

  getCardsByOpenPay = async (openPayId) => {
    const cards = await this.openPayPaidMe.findCardsByCustomer(openPayId);

    return cards;
  };
}

module.exports = UsersService;
