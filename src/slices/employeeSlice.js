import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../services/employeeService";

//Async Thunks
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (searchTerm, { rejectWithValue }) => {
    // console.log(searchTerm);
    try {
      // const url = search ? `${API_URL}?name=${search}` : API_URL;
      const response = await axios.get(API_URL);
      const data = response.data;

      if (!searchTerm) return data;

      const filteredEmployees = data.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredEmployees;
    } catch (error) {
      // Return a rejected promise with the error message
      return rejectWithValue(error.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const responce = await axios.post(API_URL, employeeData);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const { id } = employeeData;
      const responce = await axios.put(`${API_URL}/${id}`, employeeData);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (emp) => emp.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((emp) => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
