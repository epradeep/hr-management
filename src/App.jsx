import { BrowserRouter, Routes, Route } from "react-router";
// import EmployeeeList from "./pages/EmployeeList";
// import AddEmployee from "./pages/AddEmployee";
// import EditEmployee from "./pages/EditEmployee";
// import Pagination from "./components/Pagination";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="container mx-auto px-4 my-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />

          {/* <Route path="/page" element={<Pagination />} />
          <Route path="/employees" element={<EmployeeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
