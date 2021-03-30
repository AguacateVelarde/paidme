module.exports = {
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    isAdmin: {
      type: "boolean",
      default: false,
    },
    openPayClientId: {
      type: "varchar",
      unique: true,
      nullable: true,
    },
    name: {
      type: "varchar",
      nullable: true,
    },
    lastName: {
      type: "varchar",
      nullable: true,
    },
  },
};
