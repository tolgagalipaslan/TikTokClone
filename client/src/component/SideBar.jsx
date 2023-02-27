import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
const SideBar = () => {
  return (
    <div className=" flex flex-col gap-2 md:w-4/12 h-[91vh]  overflow-y-auto pt-5 mainSideBar border-r border-[#2b2a2b] md:border-none ">
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
        <div className="flex  items-center gap-2">
          {/* image  */}
          <img
            src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:flex">
            {/* name tags */}
            <div className="flex items-center gap-2">
              <h1>cznburak</h1>
              <GoVerified className="text-[#58e0f1]" />
            </div>

            <h1 className="text-sm text-gray-400">cznburak</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
