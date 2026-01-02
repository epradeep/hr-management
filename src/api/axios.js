import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "https://my-json-server.typicode.com/epradeep/hr-management",
});

// export const API_URL = "http://localhost:3000/employees";

//for deployemet
// export const API_URL =
//   "https://my-json-server.typicode.com/epradeep/hr-management/employees";

// export const getEmployees = () => axios.get(API_URL);
// export const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);
// export const addEmployee = (employee) => axios.post(API_URL, employee);
// export const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);
// export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
