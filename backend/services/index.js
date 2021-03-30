const OpenPayPaidMe = require("./openPay");
const UsersService = require("./users");

class PaidmeServices {
  constructor({ connection, openPayCredentials }) {
    this.connection = connection;
    this.openPayPaidMe = new OpenPayPaidMe(openPayCredentials);
    this.usersService = new UsersService(connection, this.openPayPaidMe);
  }
}

module.exports = PaidmeServices;
