import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../slices/employeeSlice";
import { Link } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const { list, totalItems, page, status } = useSelector(
    (state) => state.employees,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  const totalEmployees = totalItems;
  const currentEmployees = list.length;
  // console.log(list.length);

  const departmentCount = [...new Set(list.map((emp) => emp.department))]
    .length;

  return (
    <div>
      <h2 className="text-left font-bold text-xl mb-4">HR Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Link to="/employees">
          <div className="card bg-base-100 shadow p-4">
            <h2>Total Employees</h2>
            <p className="text-xl">{totalEmployees}</p>
          </div>
        </Link>
        <div className="card bg-base-100 shadow p-4">
          <h2>Departments</h2>
          <p className="text-xl">{departmentCount}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h2>Current Page</h2>
          <p className="text-xl">
            {currentEmployees} / page {page}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
