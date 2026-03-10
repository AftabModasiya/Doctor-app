import { BASE_CATEGORY_ENDPOINT } from "@endpoints/category-endpoint";

const CategoryActionTypes = {
  CATEGORY_GET_ALL: `${BASE_CATEGORY_ENDPOINT}`,
  CATEGORY_GET_BY_ID: `${BASE_CATEGORY_ENDPOINT}/get-by-id`,
  CATEGORY_CREATE: `${BASE_CATEGORY_ENDPOINT}/create`,
  CATEGORY_UPDATE: `${BASE_CATEGORY_ENDPOINT}/update`,
  CATEGORY_DELETE: `${BASE_CATEGORY_ENDPOINT}/delete`,
};

export { CategoryActionTypes };
