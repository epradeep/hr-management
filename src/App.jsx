import { BrowserRouter, Routes, Route } from "react-router";
import EmployeeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Pagination from "./components/Pagination";

function App() {
  return (
    <div className="container mx-auto px-4 my-4">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/page" element={<Pagination />} />
          <Route path="/" element={<EmployeeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
