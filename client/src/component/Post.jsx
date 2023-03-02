import React from "react";
//icons
import { GoVerified } from "react-icons/go";
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { useSelector } from "react-redux";
const Post = ({ post, allUsers }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex-col flex gap-5 py-6 w-full border-b border-[#2b2a2b] ">
      {/* title */}
      <div className="flex justify-between gap-5 w-full ">
        <div className="flex gap-2 ">
          <img
            src={post?.postedBy.picture}
            alt=""
            className="w-14 h-14 rounded-full"
          />
          <div>
            <div>
              {/* name tags */}
              <div className="flex items-center gap-2 text-white">
                <h1>{post.postedBy.userName}</h1>
                <GoVerified className="text-[#58e0f1]" />
              </div>

              <h1 className="text-sm text-gray-400">
                {post.postedBy.userName}
              </h1>
            </div>
          </div>
        </div>
        <div>
          {post?.postedBy.userId === user.sub ? null : (
            <button className="bg-[#252525] px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed border-mainRed border">
              Follow{" "}
            </button>
          )}
        </div>
      </div>
      <div className="ml-16 mr-24 text-gray-200">{post.caption}</div>
      {/* CONTENT */}
      <div className="flex items-end gap-3  mx-16">
        <video
          controls
          autoPlay
          muted
          src={post.video}
          className="min-h-[600px] w-[336px] bg-white rounded-md "
        ></video>
        <div className="flex flex-col items-center gap-2 text-gray-100">
          <button className="bg-[#2f2f2f] p-4 rounded-full">
            <BsSuitHeartFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold text-white">
            {post.likes?.length}
          </div>
          <button className="bg-[#2f2f2f] p-4 rounded-full">
            <BsFillChatDotsFill className="text-2xl" />
          </button>
          <div className="text-sm font-semibold text-white">
            {post.comments?.length}
          </div>
          <button className="bg-[#2f2f2f] p-4 rounded-full">
            <IoMdShareAlt className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
