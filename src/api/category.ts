import api from "./default";


const route = "/categories";

export const getCategories = async () => {
  const response = await api.get(`${route}/`);
  return response.data.categories;
};
