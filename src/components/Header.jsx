import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link
            to="/dashboard"
            className="btn btn-ghost text-xl hover: bg-none"
          >
            HR Management
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>User</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a onClick={handleLogout}>Sign Out</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
