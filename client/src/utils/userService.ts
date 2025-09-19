import axiosAuth from "./axios";
import { User } from "./types";

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosAuth.get(`/users`);
  return response.data.users;
};

export const getUser = async (id: number) => {
  const { data: user } = await axiosAuth.get(`/user/${id}`);
  return user;
};
