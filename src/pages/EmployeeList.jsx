import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  fetchEmployees,
  setPage,
} from "../slices/employeeSlice";
import SearchEmployee from "../components/SearchEmployee";
import Pagination from "../components/Pagination";

function EmployeeeList() {
  const dispatch = useDispatch();
  const {
    list: employeesList,
    status,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.employees);
  // console.log(page, totalPages);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch, page]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  if (status === "loading") {
    return <div className="loading loading-spinner loading-md"></div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (status === "succeeded" && employeesList.length === 0) {
    return <div>No data found.</div>;
  }

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
            {employeesList?.map((emp, i) => (
              <tr key={emp.id}>
                <td>{i + 1}</td>
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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => dispatch(setPage(p))}
      />
    </>
  );
}

export default EmployeeeList;
