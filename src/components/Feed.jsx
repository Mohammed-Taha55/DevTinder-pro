import axios from "axios";
import { Base_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () =>{
    if (feed?.length > 0) return;
    try{
    const res = await axios.get(Base_URL + "/feed", { 
      withCredentials: true,
     });
    dispatch(addFeed(res?.data?.data));
    } catch(err) {
   console.error("Feed Fetch Error:", err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if(!feed) return;
  if(feed.length <= 0) 
    return <h1 className="flex justify-center my-10">No new users!</h1>
  return (
    feed && (
     <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
     </div>
  )
);
};

export default Feed;
