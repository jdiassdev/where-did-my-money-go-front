import type { User } from "@/types/user";
import api from "./default";
import type { LoginUserRequest, RegisterUserRequest } from "./dto/user";

const route = "/users";

export const register = async (payload: RegisterUserRequest) => {
  const response = await api.post(`${route}/auth/register`, payload);
  return response.data;
};

export const login = async (payload: LoginUserRequest) => {
  const response = await api.post(`${route}/auth/login`, payload);
  return response.data;
};

export const me = async () => {
  const response = await api.get(`${route}/me`);
  return response.data;
};

export const updateMe = async (payload: Partial<User>) => {
  const { data } = await api.patch(`${route}/complete-data`, payload);
  return data;
};
