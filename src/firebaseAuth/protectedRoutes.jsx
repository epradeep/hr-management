import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  // const token = JSON.parse(localStorage.getItem("user"));
  // if (!user) {
  //   return <Navigate to="/" replace />;
  // }
  // return children;
  return user?.token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
