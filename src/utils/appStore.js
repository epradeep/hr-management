import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../slices/employeeSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
  },
});
