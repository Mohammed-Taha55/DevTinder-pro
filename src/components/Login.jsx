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
try{
  const res = await 
  axios.post(
    Base_URL + "/login",
     {
      emailId,
      password,
     },
    {  withCredentials: true }
     );
     dispatch(addUser(res.data));
   return navigate("/feed");
    } catch (err) {
       setError(err?.response?.data || "something went wrong")
  }
  };
  const  handleSignUp = async () => {
    try{
const res = await axios.post(
  Base_URL + "/signup",
  { firstName, lastName, emailId, password },
  { withCredentials: true }
 );
  dispatch(addUser(res.data.data));
   return navigate("/profile");
    }catch(err){
       setError(err?.response?.data || "something went wrong")
    }
  }
  return (
    <div className="flex justify-center my-10">
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">
       { isLoginForm? "Login": "SignUp"}
       </h2>
   <div className="">
   {!isLoginForm && <><fieldset className="fieldset my-2">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text" 
  value={firstName}
   className="input"
   onChange={(e) => setFirstName(e.target.value) }
   />
</fieldset>
<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text" 
  value={lastName}
   className="input"
   onChange={(e) => setLastName(e.target.value) }
   />
</fieldset></>}
<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">EmailId</legend>
  <input type="text" 
  value={emailId}
   className="input"
   onChange={(e) => setEmailId(e.target.value) }
   />
</fieldset>

<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">Password</legend>
  <input type="text"
  value={password}
   className="input"
   onChange={(e) => setPassword(e.target.value) }
   />
</fieldset>

   </div>
   <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={isLoginForm? handleLogin: handleSignUp}>
       { isLoginForm? "Login" : "SignUp"}
      </button>
    </div>
    <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>
      {isLoginForm? 
      "New User? SignUp here": 
      "Already SignedUp? Login"}</p>
  </div>
</div>
    </div>
  )
}

export default Login;
