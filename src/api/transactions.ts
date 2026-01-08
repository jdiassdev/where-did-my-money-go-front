import api from "./default";
import type { CreateTransaction } from "./dto/transaction";

const route = "/transactions";

export const create = async (payload: CreateTransaction) => {
  const response = await api.post(`${route}/`, payload);
  return response.data;
};

export const listUserTransactions = async (category_id?: number) => {
  const response = await api.get(`${route}/`, {
    params: category_id ? { category: category_id } : {},
  });

  return response.data;
};

export const totalResume = async () => {
  const response = await api.get(`${route}/totals-resume`);
  return response.data;
};
