# HR Management (Employee Module)

- Project Setup
  -Created the project using Vite + React
  -Configured Tailwind CSS for styling
  -Integrated daisyUI for UI components
  -Set up React Router for navigation

- Modules Implemented
  -EmployeeList
  -Add Employee
  -Edit Employee

- Employee Management
  -Built a reusable employee form
  -Implemented form validation using Formik & Yup
  -Configured Axios for API calls
  -Set up JSON Server for a local backend

- State Management (Redux Toolkit)
  -Created a global store using Redux Toolkit
  -Built employeeSlice for managing employee data
  - Async Actions:
    -Fetch employees using createAsyncThunk
    -Add employee
    -Update employee
    -Delete employee

# Authentication Flow

- In this project, I implemented authentication using Firebase, Redux, and localStorage.
  -When a user signs up, a new account is created using Firebase
  -The user profile is updated with their name
  -User data is stored in localStorage for persistence
  -Redux is updated with authenticated user data
  -On login, Firebase verifies credentials and grants access
  -Protected routes allow only authenticated users
  -On logout, user data is cleared from localStorage
  -Redux state is reset and user is redirected to login

# Features

-Employee search functionality
-Employee list with pagination
-Responsive UI using TailwindCSS
-Form validation for all inputs
-Clean and reusable component structure

- Tech Stack
  -React (Vite)
  -Redux Toolkit
  -React Router
  -Axios
  -Tailwind CSS + daisyUI
  -Formik & Yup
  -JSON Server
  -Firebase Authentication

# Summary

- This project demonstrates building a complete employee management system with CRUD operations, authentication, search, pagination, and state management using modern React tools.

"# hr-management"
