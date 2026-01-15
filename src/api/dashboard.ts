import api from "./default";

const route = "/dashboard";

export const getCurrentMonth = async (date: Date) => {
  const response = await api.get(route, {
    params: {
      date: date.toISOString().substring(0, 10),
    },
  });
  return response.data;
};
export const getTopCategoryMonth = async (date: Date) => {
  const response = await api.get(`${route}/top-categories`, {
    params: {
      date: date.toISOString().substring(0, 10),
    },
  });
  return response.data;
};

export const getMonthlyEvolution = async (date: Date) => {
  const response = await api.get(`${route}/evolution`, {
    params: {
      date: date.toISOString().substring(0, 10),
    },
  });
  return response.data;
};
