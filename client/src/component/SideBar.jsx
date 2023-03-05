import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { client } from "@/utils/client";
const SideBar = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    getUsers();
  }, [user]);
  //GET USERS
  const getUsers = async () => {
    try {
      const query = `*[_type == "user"]`;
      const results = await client.fetch(query);
      setUsers(results);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        location.pathname === "/" ? "w-fit md:w-4/12" : "w-fit "
      } flex flex-col gap-2   h-[91vh]  overflow-y-auto overflow-x-visible pt-5 mainSideBar border-r border-[#2b2a2b] md:border-none`}
    >
      <div className=" flex flex-col gap-2 border-b border-[#2b2a2b] ">
        <div className="flex gap-2 text-white hover:text-mainRed text-2xl items-center hover:bg-[#111010] py-2 duration-300 px-3 rounded justify-center md:justify-start">
          <AiFillHome /> <h1 className="hidden md:flex">For You</h1>
        </div>
        <div className="flex gap-2 text-white hover:text-mainRed text-2xl items-center hover:bg-[#111010] py-2 duration-300 px-3 rounded justify-center md:justify-start">
          <BsFillPeopleFill /> <h1 className="hidden md:flex">Followings</h1>
        </div>
        <div className="flex gap-2 text-white hover:text-mainRed text-2xl items-center hover:bg-[#111010] py-2 duration-300 px-3 rounded justify-center md:justify-start">
          <FaVideo /> <h1 className="hidden md:flex">LIVE Stream</h1>
        </div>
      </div>
      <div className=" flex flex-col gap-2 text-white p-2">
        <h1 className="hidden md:flex">Suggested Accounts</h1>
        {/* Peoples */}
        {users?.map((user, i) => (
          <Link
            to={`/profile/${user.subId}`}
            key={i}
            className="flex  items-center gap-2"
          >
            {/* image  */}
            <img src={user.picture} alt="" className="w-10 h-10 rounded-full" />
            <div className="hidden md:flex flex-col">
              {/* name tags */}
              <div className="flex  items-center gap-2">
                <h1>{user.userName}</h1>
                <GoVerified className="text-[#58e0f1]" />
              </div>

              <h1 className="text-sm text-gray-400">{user.userName}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
