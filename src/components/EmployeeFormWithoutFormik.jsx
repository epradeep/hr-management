import { useEffect, useState } from "react";

function EmployeeForm({ onSubmitBtn, initialData }) {
  // eslint-disable-next-line react-hooks/purity
  const submissionId = Date.now().toString();

  const [employee, setEmployee] = useState({
    id: submissionId,
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (initialData) setEmployee(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    // console.log(e.target.name);
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitBtn(employee);
  };

  return (
    <>
      <form className="w-full mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="input focus:outline-none focus:bg-white"
              value={employee.name}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className="input focus:outline-none focus:bg-white"
              name="email"
              placeholder="Email"
              value={employee.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <input
              type="text"
              className="input focus:outline-none focus:bg-white"
              name="department"
              placeholder="Department"
              value={employee.department}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </form>
    </>
  );
}

export default EmployeeForm;
