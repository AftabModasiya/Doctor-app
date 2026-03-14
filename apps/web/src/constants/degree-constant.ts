import { BASE_DEGREE_ENDPOINT } from "@endpoints/degree-endpoint";

const DegreeActionTypes = {
  DEGREE_GET_ALL: `${BASE_DEGREE_ENDPOINT}`,
  DEGREE_GET_BY_ID: `${BASE_DEGREE_ENDPOINT}/get-by-id`,
  DEGREE_CREATE: `${BASE_DEGREE_ENDPOINT}/create`,
  DEGREE_UPDATE: `${BASE_DEGREE_ENDPOINT}/update`,
  DEGREE_DELETE: `${BASE_DEGREE_ENDPOINT}/delete`,
};

export { DegreeActionTypes };
