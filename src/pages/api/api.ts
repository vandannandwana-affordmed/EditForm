import { User } from "@/types/user";
import axios from "axios";

const BASE_URL = "http://192.168.29.254:8080/";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const createAccount = async (user: User) => {
  return (await axiosInstance.put<User>("users/vandan@gmail.com", user)).data;
};

export const getuser = async () => {
  return (await axiosInstance.get<User>("users/vandan@gmail.com")).data;
};
