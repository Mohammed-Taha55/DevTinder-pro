import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { Base_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useEffect } from "react";

const Body = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const userData = useSelector((store) => store.user);

 const fetchUser = async () => {
  if(userData) return;
 try {  
        const res = await axios.get(Base_URL + "/profile/view", {
           withCredentials: true,
    });
dispatch(addUser(res.data));

  }catch(err){
    if(err.status === 401){
    navigate("/login");
    }
      console.error(err);
    }
  };
useEffect(() => {
fetchUser();
}, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

