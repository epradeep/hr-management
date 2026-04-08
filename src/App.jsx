import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
// import Pagination from "./components/Pagination";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./firebaseAuth/protectedRoutes";
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/page" element={<Pagination />} /> */}
              <Route path="/employees" element={<EmployeeeList />} />
              <Route path="/add" element={<AddEmployee />} />
              <Route path="/edit/:id" element={<EditEmployee />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
