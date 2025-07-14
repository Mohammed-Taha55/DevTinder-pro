import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../Utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        Base_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        Base_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl rounded-2xl border border-neutral p-6 transition-all duration-300 hover:shadow-2xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-semibold mb-4">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {!isLoginForm && (
            <>
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text font-medium">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  className="input input-bordered input-primary"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text font-medium">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  className="input input-bordered input-primary"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={emailId}
              className="input input-bordered input-accent"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="Example@123"
              value={password}
              className="input input-bordered input-accent"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="card-actions mt-4">
            <button
              className="btn btn-primary w-full hover:scale-105 transition-transform"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="text-center mt-4 text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Sign up here"
              : "Already registered? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

