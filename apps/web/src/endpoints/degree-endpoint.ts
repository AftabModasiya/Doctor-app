const BASE_DEGREE_ENDPOINT = "/degree";

const DegreeEndpoints = {
  getDegrees: `${BASE_DEGREE_ENDPOINT}`,
  getDegreeById: (id: string) => `${BASE_DEGREE_ENDPOINT}/${id}`,
  createDegree: `${BASE_DEGREE_ENDPOINT}`,
  updateDegree: (id: string) => `${BASE_DEGREE_ENDPOINT}/${id}`,
  deleteDegree: (id: string) => `${BASE_DEGREE_ENDPOINT}/${id}`,
};

export { DegreeEndpoints, BASE_DEGREE_ENDPOINT };
