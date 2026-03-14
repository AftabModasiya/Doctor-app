const BASE_CATEGORY_ENDPOINT = "/category";

const CategoryEndpoints = {
  getCategories: `${BASE_CATEGORY_ENDPOINT}`,
  getCategoryById: (id: string) => `${BASE_CATEGORY_ENDPOINT}/${id}`,
  createCategory: `${BASE_CATEGORY_ENDPOINT}`,
  updateCategory: (id: string) => `${BASE_CATEGORY_ENDPOINT}/${id}`,
  deleteCategory: (id: string) => `${BASE_CATEGORY_ENDPOINT}/${id}`,
};

export { CategoryEndpoints, BASE_CATEGORY_ENDPOINT };
