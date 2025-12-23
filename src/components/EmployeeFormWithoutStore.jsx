import { Formik, Form, Field, ErrorMessage } from "formik";
import { employeeSchema } from "../validation/employeeValidation";
import { useNavigate } from "react-router";

function EmployeeForm({ onSubmitBtn, initialData }) {
  const navigate = useNavigate();
  const initialValues = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    department: initialData?.department || "",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={employeeSchema}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          onSubmitBtn({ ...values, id: Date.now().toString() }), resetForm();
        }}
      >
        {() => {
          return (
            <Form className="flex flex-wrap -mx-3 px-3 mt-5">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <label
                  htmlFor="name"
                  className="block tracking-wide text-gray-700 mb-2"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="input focus:outline-none focus:bg-white"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <label
                  htmlFor="email"
                  className="block tracking-wide text-gray-700 mb-2"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="input focus:outline-none focus:bg-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <label
                  htmlFor="department"
                  className="block tracking-wide text-gray-700 mb-2"
                >
                  Department
                </label>
                {/* <Field
                  type="text"
                  id="department"
                  name="department"
                  className="input focus:outline-none focus:bg-white"
                /> */}
                <Field
                  as="select"
                  id="department"
                  name="department"
                  className="input focus:outline-none focus:bg-white"
                >
                  <option value="">Select Department</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                </Field>
                <ErrorMessage
                  name="department"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white rounded py-2 px-4 mt-4"
              >
                {initialData ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-red-500 hover:bg-red-700 text-white rounded py-2 px-4 mt-4"
              >
                Cancel
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default EmployeeForm;
