import api from "./default";
import type { LoginUserRequest, RegisterUserRequest } from "./types/user/dto";

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
