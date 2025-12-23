import { BrowserRouter, Routes, Route } from "react-router";
import EmployeeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <div className="container mx-auto px-4 my-4">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<EmployeeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
