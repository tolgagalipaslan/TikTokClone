import React from "react";
//icons
import { GoVerified } from "react-icons/go";
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
const Post = () => {
  return (
    <div className="flex-col flex gap-5 py-6 w-full border-b border-[#2b2a2b] ">
      {/* title */}
      <div className="flex justify-between gap-5 w-full ">
        <div className="flex gap-2 ">
          <img
            src="https://i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg"
            alt=""
            className="w-14 h-14 rounded-full"
          />
          <div>
            <div>
              {/* name tags */}
              <div className="flex items-center gap-2 text-white">
                <h1>cznburak</h1>
                <GoVerified className="text-[#58e0f1]" />
              </div>

              <h1 className="text-sm text-gray-400">cznburak</h1>
            </div>
          </div>
        </div>
        <div>
          <button className="bg-[#252525] px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed border-mainRed border">
            Follow{" "}
          </button>
        </div>
      </div>
      <div className="ml-16 mr-24 text-gray-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
        quaerat saepe aspernatur possimus! Iure consectetur reprehenderit
        voluptatem quos, aut dignissimos non vel mollitia ipsum at in.
      </div>
      {/* CONTENT */}
      <div className="flex items-end gap-3  mx-16">
        <div className="min-h-[450px] w-[300px] bg-white rounded-md "></div>
        <div className="flex flex-col items-center gap-2 text-gray-100">
          <button className="bg-[#2f2f2f] p-4 rounded-full">
            <BsSuitHeartFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold text-white">11.2k</div>
          <button className="bg-[#2f2f2f] p-4 rounded-full">
            <BsFillChatDotsFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold text-white">11.2k</div>
          <button className="bg-[#2f2f2f] p-4 rounded-full">
            <IoMdShareAlt className="text-2xl" />
          </button>
          <div className="text-sm font-semibold text-white">11.2k</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
