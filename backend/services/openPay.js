"use strict";
const Openpay = require("openpay");

class OpenPayPaidMe {
  constructor({ merchantId, privateKey, isProduction }) {
    this.openpay = new Openpay(merchantId, privateKey, isProduction);
  }

  createCustomer = (user) => {
    return new Promise((resolve, reject) => {
      var newCustomer = {
        name: user.name,
        email: user.email,
        last_name: user.lastName,
      };

      this.openpay.customers.create(newCustomer, function (error, body) {
        if (error) {
          console.log(error);
          return reject(error.description);
        }
        return resolve(body);
      });
    });
  };

  findCardsByCustomer = (customerId) => {
    return new Promise((resolve, reject) => {
      this.openpay.customers.cards.list(
        customerId,
        { limit: 5 },
        (error, data) => {
          if (error) {
            console.log(error);
            return reject(error.description);
          }
          return resolve(data);
        }
      );
    });
  };

  createNewToken = ({
    customerId,
    name,
    lastName,
    expirationMonth,
    expirationYear,
    card,
    cvv2,
  }) => {
    return new Promise((resolve, reject) => {
      this.openpay.customers.cards.create(
        customerId,
        {
          card_number: card,
          holder_name: `${name} ${lastName}`,
          expiration_month: expirationMonth,
          expiration_year: expirationYear,
          cvv2,
        },
        (error, data) => {
          if (error) {
            console.log(error);
            return reject(error.description);
          }
          return resolve(data);
        }
      );
    });
  };
}

module.exports = OpenPayPaidMe;
