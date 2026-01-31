import { User } from "@/types/user";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const createAccount = async (user: User) => {
  return (await axiosInstance.put<User>("users/vandan@gmail.com", user)).data;
};

export const getUser = async () => {
  return (await axiosInstance.get<User>("users/vandan@gmail.com")).data;
};
