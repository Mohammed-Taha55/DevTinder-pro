import axios from "axios";
import { Base_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../Utils/feedSlice";

const UserCard = ( {user}  ) => {
  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try{
      const res = await axios.post(Base_URL + "/request/send/" + status + "/" + userId, 
        {}, 
        { withCredentials: true, }
      );
           dispatch(removeUserFromFeed(userId))
    }  
    catch(err){

    }
  }
  return (
    <div>
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src= {user.photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + " " + gender}</p> }
    <p>{skills}</p>
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-secondary" onClick={() => handleSendRequest("ignored", _id)}>
        Ignore
        </button>
        <button className="btn btn-primary" onClick={() => handleSendRequest("intrested", _id)}>
          Interested
        </button>
    </div>
  </div>
</div>
    </div>
  );
};
export default UserCard;