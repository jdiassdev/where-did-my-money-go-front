import api from "./default";
import type { CreateTransaction, UpdateTransaction } from "./dto/transaction";

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

export const updateTransaction = async (
  payload: UpdateTransaction,
  transaction_id: number
) => {
  const response = await api.patch(`${route}/${transaction_id}`, payload);
  return response.data;
};

export const totalResume = async (category_id?: number) => {
  const response = await api.get(`${route}/totals-resume`, {
    params: category_id ? { category: category_id } : {},
  });
  return response.data;
};

export const activateTransaction = async (transaction_id: number) => {
  const response = await api.patch(`${route}/${transaction_id}/activate`);
  return response.data;
};

export const inactivateTransaction = async (transaction_id: number) => {
  const response = await api.patch(`${route}/${transaction_id}/inactivate`);
  return response.data;
};
