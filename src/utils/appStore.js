import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../slices/employeeSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});
