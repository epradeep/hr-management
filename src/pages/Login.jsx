import { useRef, useState } from "react";
import { checkLoginData } from "../validation/loginValidation";
import { registerUser } from "../firebaseAuth/authService";
import { useNavigate } from "react-router-dom";
import { loginUserThunk } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const fullName = fullNameRef.current?.value.trim() || "";

    if (!email || !password) {
      setErrorMessage("Email and Password are required");
      return;
    }

    // Validation
    const message = checkLoginData(email, password);
    if (message) {
      setErrorMessage(message);
      return;
    }

    // Sign In/Sign Up Logic
    try {
      setErrorMessage("");
      if (!isSignInForm) {
        //Sign Up
        const user = await registerUser(fullName, email, password);
        console.log(user.displayName);
        const userData = {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName,
          token: user.accessToken,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        // alert("Sign up successful");
        navigate("/");
      } else {
        // Sign In
        await dispatch(loginUserThunk({ email, password })).unwrap();
        // alert("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("Email already exists");
          break;
        case "auth/invalid-email":
          setErrorMessage("Invalid email format");
          break;
        case "auth/user-not-found":
          setErrorMessage("User not found");
          break;
        case "auth/wrong-password":
          setErrorMessage("Incorrect password");
          break;
        case "auth/invalid-credential":
          setErrorMessage("Invalid email or password");
          break;
        case "auth/weak-password":
          setErrorMessage("Password should be at least 6 characters");
          break;
        default:
          setErrorMessage(error.message);
      }
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage("");
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-white border border-gray-300 rounded-xl w-96 p-6 shadow-lg">
          <legend className="text-2xl font-bold mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </legend>

          {!isSignInForm && (
            <>
              <label className="label font-medium">Full Name</label>
              <input
                ref={fullNameRef}
                type="text"
                className="input input-bordered w-full focus:outline-none mb-3"
                placeholder="Enter Full Name"
              />
            </>
          )}

          <label className="label font-medium">Email</label>
          <input
            ref={emailRef}
            type="email"
            className="input input-bordered w-full focus:outline-none mb-3"
            placeholder="Enter Email"
          />

          <label className="label font-medium">Password</label>
          <input
            ref={passwordRef}
            type="password"
            className="input input-bordered w-full focus:outline-none"
            placeholder="Enter Password"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm font-medium mt-3">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-5"
          >
            {loading ? "Please wait..." : isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-sm text-gray-600 mt-4 cursor-pointer hover:text-blue-600"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "Don't have an account? Sign Up Now"
              : "Already have an account? Sign In Now"}
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
