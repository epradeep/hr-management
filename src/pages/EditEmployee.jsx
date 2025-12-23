import EmployeeForm from "../components/EmployeeForm";
import { useNavigate, useParams } from "react-router";
import { updateEmployee } from "../slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

function EditEmployee() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedEmployee = useSelector((state) =>
    state.employees.list.find((emp) => emp.id === id)
  );
  // console.log(selectedEmployee);

  const handleSubmit = (data) => {
    try {
      dispatch(updateEmployee(data)).then(() => navigate("/"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EmployeeForm
      selectedEmployee={selectedEmployee}
      onSubmitBtn={handleSubmit}
    />
  );
}

export default EditEmployee;
