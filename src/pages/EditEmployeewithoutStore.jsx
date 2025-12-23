import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useNavigate, useParams } from "react-router";
import { getEmployeeById, updateEmployee } from "../services/employeeService";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);
  const [editEmployee, setEditEmployee] = useState(null);
  // console.log(editEmployee);

  useEffect(() => {
    getEmployeeById(id).then((res) => setEditEmployee(res.data));
  }, [id]);

  const handleSubmit = (data) => {
    // console.log(data);
    updateEmployee(id, data).then(() => navigate("/"));
  };

  return (
    editEmployee && (
      <EmployeeForm initialData={editEmployee} onSubmitBtn={handleSubmit} />
    )
  );
}

export default EditEmployee;
