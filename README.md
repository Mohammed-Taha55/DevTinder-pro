# React + Vite


 import axios from "axios"
import { Base_URL } from "../Utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
     const res = await axios.get(Base_URL + "/user/connections", {
        withCredentials: true,
     });
     dispatch(addConnections(res.data.data));
        }catch(err){
        console.error("cant fetch connection", err);
        }
    };
    useEffect(() => {
        fetchConnections();
    }, []);
    if(!connections) return;
    if(connections.length == 0) return <h1>No Connections Found</h1>
  return (
    <div className=" text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections</h1>
        {connections.map((connection)=>{
      const { _id, firstName, lastName, photoUrl, age, gender, about} = 
      connection;
     return (
        <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div> 
                <img alt="photo" 
                className="w-20 h-20 rounded-full" 
                src={photoUrl}
             /></div>
            <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
                </h2>
       {age && gender &&  <p>  {age + " " + gender}</p>}
    <p>{about}</p>
    </div>
    </div>
     )})}
    </div>
  );

    taha@gmail.com
    Taha@kai12

   yusuf90@gamil.com
    Yusuf@123
    how use cmd in ubantu:-
    cd downloads
    chmod 400 "Dev Tinder-secret.pem"
    ssh -i "Dev Tinder-secret.pem" ubuntu@ec2-16-171-64-98.eu-north-1.compute.amazonaws.com
    export const Base_URL = import.meta.env.PROD ? "/api" : "http://localhost:7777/api";
export const Base_URL = "/api";