export default class UserService {
  constructor(axios) {
    this.axios = axios;
  }

  signin = ({ email, password, name, lastName }) => {
    return this.axios.post("/user", {
      user: {
        email,
        password,
        name,
        lastName,
      },
    });
  };

  getCards = () => {
    const openPayId = localStorage.getItem("openPayId");
    return this.axios.get(`/user/${openPayId}`);
  };

  getUsers = () => {
    return this.axios.get(`/user`);
  };

  createCard = (card) => {
    const userId = localStorage.getItem("userId");
    return this.axios.put(`/user/${userId}`, {
      card,
    });
  };
}
