import axiosAuth from "./axios";
import { SignInFormType, SignUpFormType } from "./types";

export const createAccount = async ({
  username,
  password,
  confirmPassword,
}: SignUpFormType) => {
  try {
    const { data } = await axiosAuth.post(`/auth/register`, {
      username,
      password,
      confirmPassword,
    });

    return data;
  } catch {
    return { statusCode: "409", message: "User already exists." };
  }
};

export const login = async ({ username, password }: SignInFormType) => {
  try {
    const { data } = await axiosAuth.post(`/auth/login`, {
      username,
      password,
    });
    return data;
  } catch {
    return { statusCode: "401", message: "Wrong email or password." };
  }
};

export const logout = async () => {
  try {
    await axiosAuth.post("/auth/logout");
  } catch (error) {
    return { statusCode: "500", message: error };
  }
};
