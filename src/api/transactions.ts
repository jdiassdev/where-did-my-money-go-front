// import type { User } from "@/types/user";
import api from "./default";
import type { CreateTransaction } from "./dto/transaction";

const route = "/transactions";

export const create = async (payload: CreateTransaction) => {
  const response = await api.post(`${route}/`, payload);
  return response.data;
};

export const listUserTransactions = async () => {
  const response = await api.get(`${route}/`);
  return response.data;
};

export const totalResume = async () => {
  const response = await api.get(`${route}/totals-resume`);
  return response.data;
};

