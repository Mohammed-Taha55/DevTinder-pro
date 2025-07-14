import axios from "axios";
import { Base_URL } from "../Utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Can't fetch connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center h-40">
        <h1 className="text-2xl font-semibold text-gray-400">
          🧍 No Connections Found
        </h1>
      </div>
    );

  return (
    <div className="my-10 px-4">
      <h1 className="text-center text-3xl font-bold mb-8 text-white">
        🤝 Your Connections
      </h1>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {connections.map((connection, index) => {
          if (!connection || !connection.firstName) return null;

          const {
            _id = index,
            firstName = "",
            lastName = "",
            photoUrl = "https://via.placeholder.com/80",
            age,
            gender,
            about = "No description",
          } = connection;

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
                  <p className="mt-1 text-sm">{about}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

