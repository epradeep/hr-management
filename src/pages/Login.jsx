import { useRef, useState } from "react";
import { checkLoginData } from "../validation/loginValidation";

function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const fullName = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwordRef.current.value);
    const message = checkLoginData(
      emailRef.current.value,
      passwordRef.current.value,
    );
    setErrorMessage(message);
    // if (emailRef===) {
    // }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-white-500 border-base-300 rounded-box w-xs mx-auto border p-4">
          <legend className="fieldset-legend text-xl">
            Sign {isSignInForm ? "In" : "Up"}
          </legend>
          {!isSignInForm && (
            <>
              <label className="label">Full Name</label>
              <input
                ref={fullName}
                type="text"
                className="input focus:outline-none"
                placeholder="Full Name"
              />
            </>
          )}

          <label className="label">Email</label>
          <input
            ref={emailRef}
            type="email"
            className="input focus:outline-none"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            ref={passwordRef}
            type="password"
            className="input focus:outline-none"
            placeholder="Password"
          />
          <span className="text-red-500 font-bold py-1">{errorMessage}</span>
          <button className="btn btn-primary mt-4">
            Sign {isSignInForm ? "In" : "Up"}
          </button>

          <p
            className="text-stone-500 hover: text-stone-60"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? " Don't have an account? Sign Up Now"
              : " Already have an account? Sign In Now"}
          </p>
        </fieldset>
      </form>
    </>
  );
}

export default Login;
