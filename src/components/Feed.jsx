import axios from "axios";
import { Base_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length > 0) return;
    try {
      const res = await axios.get(Base_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Feed Fetch Error:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length === 0)
    return (
      <div className="flex justify-center items-center h-40">
        <h1 className="text-xl text-gray-400 font-semibold">
          🙅 No new users to suggest!
        </h1>
      </div>
    );

  return (
    <div className="my-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6 text-white">
        🔥 Suggested User
      </h1>

      <div className="flex justify-center">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
