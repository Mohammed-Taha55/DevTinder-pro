import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Base_URL } from "../Utils/constants";
import axios from "axios";
import { removeUser } from "../Utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        Base_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="navbar bg-base-100 px-4 shadow-md">
      <div className="flex-1">
        <Link
          to="/feed"
          className="btn btn-ghost normal-case text-xl font-semibold text-primary hover:scale-105 transition"
        >
          🧑‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <p className="text-base font-medium text-gray-700 hidden sm:block">
            Welcome, <span className="text-primary">{user.firstName}</span>
          </p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring hover:ring-primary focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full">
                <img alt="User Avatar" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 space-y-1"
            >
              <li>
                <Link to="/profile" className="font-medium">
                  👤 Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="font-medium">
                  🤝 Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="font-medium">
                  📩 Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout} className="text-red-500 font-medium hover:text-red-600">
                  🚪 Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
