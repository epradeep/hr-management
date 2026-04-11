import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

//Async Thunks & pagination
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { getState, rejectWithValue }) => {
    const { page, limit, search } = getState().employees;
    // console.log(page, limit, search);
    try {
      // const url = search ? `${API_URL}?name=${search}` : API_URL;
      const response = await api.get("/employees", {
        params: {
          _page: page,
          _limit: limit,
          q: search || "", // optional search
        },
      });
      const totalItems = Number(response.headers["x-total-count"]);
      // console.log("Headers:", response.headers);
      const totalPages = Math.ceil(totalItems / limit);

      // console.log("After filter:", response.data);

      // if (search) {
      //   employees = data.filter(
      //     (emp) =>
      //       emp.name.toLowerCase().includes(search.toLowerCase()) ||
      //       emp.email.toLowerCase().includes(search.toLowerCase()) ||
      //       emp.department.toLowerCase().includes(search.toLowerCase()),
      //   );
      // }

      return {
        employees: response.data,
        totalItems,
        totalPages,
      };
    } catch (error) {
      // Return a rejected promise with the error message
      return rejectWithValue(error.message);
    }
  },
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const responce = await api.post("/employees", employeeData);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const { id } = employeeData;
      const responce = await api.put(`/employees/${id}`, employeeData);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/employees/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  list: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  page: 1,
  limit: 4,
  totalPages: 0,
  totalItems: 0,

  search: "",
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1; // reset page on search
    },
    resetEmployees(state) {
      state.search = "";
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.employees;
        state.totalPages = action.payload?.totalPages;
        state.totalItems = action.payload?.totalItems;
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
          (emp) => emp.id === action.payload.id,
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

export const { setPage, setSearch, resetEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
