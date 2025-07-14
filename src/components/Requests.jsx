import axios from "axios";
import { Base_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequests, removeRequests } from "../Utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        Base_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.error("Can't review request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(Base_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Can't fetch requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <div className="flex justify-center items-center h-40">
        <h1 className="text-2xl font-semibold text-gray-400">
          😔 No Connection Requests Found
        </h1>
      </div>
    );

  return (
    <div className="my-10 px-4">
      <h1 className="text-center text-3xl font-bold mb-8 text-white">
        📨 Connection Requests
      </h1>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          } = request.fromUserId;

          return (
            <div
              key={_id}
              className="card bg-base-200 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="card-body flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  alt="user"
                  className="w-20 h-20 rounded-full object-cover border shadow"
                  src={photoUrl}
                />
                <div className="flex-1 text-left">
                  <h2 className="text-xl font-bold text-primary">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-gray-500">{`${age} • ${gender}`}</p>
                  )}
                  {about && <p className="mt-1 text-sm">{about}</p>}
                </div>
                <div className="flex gap-2 sm:ml-auto mt-4 sm:mt-0">
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-sm btn-success text-white"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
