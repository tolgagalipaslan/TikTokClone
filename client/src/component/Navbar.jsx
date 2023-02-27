import React from "react";
import { SiTiktok } from "react-icons/si";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
const Navbar = () => {
  return (
    <div className="flex   justify-between  items-center h-[8vh]    ">
      <div className="flex items-center text-3xl text-white">
        <SiTiktok className="text-4xl" />{" "}
        <span className="font-semibold">TikTok</span>
      </div>
      <div>
        <form className="bg-[#2f2f2f]  rounded-full items-center overflow-hidden md:flex hidden  ">
          <input
            type="text"
            className="bg-transparent outline-none py-2 px-4 text-gray-300"
            placeholder="Search "
          />
          <div className="h-full hover:bg-[#474747] py-2 ">
            <button className=" text-[#767373] bg-transparent  outline-none   border-l-2  border-[#616060] px-4 text-2xl">
              <AiOutlineSearch />
            </button>
          </div>
        </form>
      </div>
      <div className="text-white flex items-center  gap-2 ">
        <button className="bg-[#252525] px-4 py-2 rounded items-center flex gap-2 hover:bg-[#474747]">
          <AiOutlinePlus /> Upload
        </button>
        <button className="bg-[#252525] px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed">
          Sign In{" "}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
