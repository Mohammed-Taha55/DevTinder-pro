import axios from "axios";
import { Base_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../Utils/feedSlice";
import { useRef } from "react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${Base_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Request send error:", err);
    }
  };

  const handleSwipe = (direction) => {
    if (direction === "left") handleSendRequest("ignored", _id);
    if (direction === "right") handleSendRequest("intrested", _id);
  };

  let startX = null;

  const onTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 100) {
      handleSwipe(diff > 0 ? "right" : "left");
    }
    startX = null;
  };

  const onMouseDown = (e) => {
    startX = e.clientX;
  };

  const onMouseUp = (e) => {
    if (startX === null) return;
    const endX = e.clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 100) {
      handleSwipe(diff > 0 ? "right" : "left");
    }
    startX = null;
  };

  return (
    <div
      ref={cardRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className="card w-96 bg-base-200 shadow-xl transition-transform duration-300 select-none cursor-grab active:cursor-grabbing border border-base-300 hover:shadow-2xl"
    >
      <figure className="w-full h-72 overflow-hidden rounded-t-xl">
        <img
          src={
            photoUrl ||
            `https://avatars.dicebear.com/api/initials/${firstName}-${lastName}.svg`
          }
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.src = `https://avatars.dicebear.com/api/initials/${firstName}-${lastName}.svg`;
          }}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl font-semibold text-primary-content">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-400">{`${age} • ${gender}`}</p>
        )}

        {about && (
          <p className="mt-2 text-sm text-white opacity-80">"{about}"</p>
        )}

        <div className="flex gap-4 mt-6">
          <button
            className="btn btn-error btn-sm w-1/2 text-white"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-success btn-sm w-1/2 text-white"
            onClick={() => handleSendRequest("intrested", _id)}
          >
            Interested
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-3 italic">
          💡 Swipe left/right or use buttons
        </p>
      </div>
    </div>
  );
};

export default UserCard;


