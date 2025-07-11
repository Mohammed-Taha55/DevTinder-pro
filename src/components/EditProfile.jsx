import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { Base_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async() => {
      try {
        setError("");
            const res = await axios.patch(Base_URL + "/profile/edit", {
              firstName, 
              lastName, 
              photoUrl, 
              age, 
              gender, 
              about,
            },{ withCredentials: true }
          );
           dispatch(addUser(res?.data?.data));
           setShowToast(true);
           setTimeout(()=>{
            setShowToast(false);
           }, 3000);
      }catch (err) {
        setError(err.response.data)
      }
    };
  return (
<><div className="flex justify-center my-10">
  <div className="flex justify-center mx-10">
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
   <div className="">
<fieldset className="fieldset my-2">
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
</fieldset>
<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">Age</legend>
  <input type="text" 
  value={age}
   className="input"
   onChange={(e) => setAge(e.target.value) }
   />
</fieldset>
<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">Gender</legend>
  <input type="text" 
  value={gender}
   className="input"
   onChange={(e) => setGender(e.target.value) }
   />
</fieldset>
<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">About</legend>
  <input type="text" 
  value={about}
   className="input"
   onChange={(e) => setAbout(e.target.value) }
   />
</fieldset>
<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">Photo</legend>
  <input type="text" 
  value={photoUrl}
   className="input"
   onChange={(e) => setPhotoUrl(e.target.value) }
   />
</fieldset>
   </div>
   <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={saveProfile}>
       Save Profile
      </button>
    </div>
  </div>
</div>
    </div>
    <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }}/>
    </div>
  {showToast && (  <div className="toast toast-top toast-start">
 
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>
  )}
    </>
  );
};

export default EditProfile;
