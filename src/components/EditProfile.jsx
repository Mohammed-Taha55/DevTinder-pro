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

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        Base_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-10 px-4">
        <div className="card bg-base-100 w-full max-w-md shadow-lg rounded-xl border p-6">
          <div className="card-body">
            <h2 className="card-title justify-center text-xl font-semibold mb-4">
              ✏️ Edit Profile
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  className="input input-bordered input-primary"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  className="input input-bordered input-primary"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">Age</label>
                <div className="input-group">
                  <input
                    type="number"
                    min="13"
                    max="100"
                    placeholder="Enter your age"
                    value={age}
                    className="input input-bordered w-full"
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <span className="bg-base-200 px-3 py-2 rounded-r-lg text-sm font-medium">
                    years
                  </span>
                </div>
              </div>

              <div className="form-control">
                <label className="label font-medium">Gender</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="radio radio-primary"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                    />
                    <span>Male</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="radio radio-primary"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                    />
                    <span>Female</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="others"
                      className="radio radio-primary"
                      checked={gender === "others"}
                      onChange={() => setGender("others")}
                    />
                    <span>Other</span>
                  </label>
                </div>
              </div>

              <div className="form-control">
                <label className="label font-medium">About</label>
                <input
                  type="text"
                  placeholder="Say something about yourself"
                  value={about}
                  className="input input-bordered"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">Photo URL</label>
                <input
                  type="text"
                  placeholder="Paste image URL"
                  value={photoUrl}
                  className="input input-bordered"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}

              <div className="card-actions justify-center mt-6">
                <button className="btn btn-primary w-full" onClick={saveProfile}>
                  💾 Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Card */}
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-start z-50">
          <div className="alert alert-success shadow-lg">
            <span>✅ Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

