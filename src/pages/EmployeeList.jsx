import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "../slices/employeeSlice";
import SearchEmployee from "../components/SearchEmployee";

function EmployeeeList() {
  const employeesList = useSelector((state) => state.employees.list);
  const employeeStatus = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (employeeStatus === "idle") {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  if (employeeStatus === "loading") {
    return <div className="loading loading-spinner loading-md"></div>;
  }

  if (employeeStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  // const handleSearch = () => {
  //   if (!searchTerm.trim()) return;
  //   dispatch(fetchEmployees(searchTerm.trim()));
  // };

  if (employeeStatus === "succeeded" && fetchEmployees().length > 0) {
    return (
      <>
        <h2 className="text-left text-2xl">Employeee List</h2>
        <div className="flex justify-between my-4">
          <SearchEmployee />
          <Link to={"/add"} className="btn btn-success ">
            Add Employee
          </Link>
        </div>

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeesList?.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td className="flex flex-wrap">
                    <Link className="btn btn-success" to={`/edit/${emp.id}`}>
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-error"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  // Handle the 'succeeded' status with an empty list
  if (employeeStatus === "succeeded" && fetchEmployees().length === 0) {
    return <div>No data found.</div>;
  }
}

export default EmployeeeList;
