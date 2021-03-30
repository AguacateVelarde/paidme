import UserService from "./user";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export const userService = new UserService(axiosInstance);
