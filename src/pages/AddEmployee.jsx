import { useNavigate } from "react-router";
import EmployeeForm from "../components/EmployeeForm";
import { useDispatch } from "react-redux";
import { addEmployee } from "../slices/employeeSlice";

function AddEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (employee) => {
    try {
      dispatch(addEmployee(employee));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2 className="text-2xl">Add Employee</h2>
      <EmployeeForm onSubmitBtn={handleSubmit} />
    </>
  );
}

export default AddEmployee;
