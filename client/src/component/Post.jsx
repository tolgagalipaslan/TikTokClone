import React, { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { show } from "@/store/showAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  likeOrUnlike,
  getSinglePost,
  followOrUnfollow,
  getSingleUser,
} from "@/helpers/Api";

const Post = ({ post, allUsers }) => {
  const user = useSelector((state) => state.user.user);
  const postedByUser = allUsers?.filter((i) => i.subId === post.postedBy._ref);
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);
  const dispatch = useDispatch();

  //handleLike
  useEffect(() => {
    getSinglePost(post._id).then((res) => {
      setLikes(res.likes);
      getSingleUser(res.userId).then((res) => {
        setFollowers(res.followers);
      });
    });
  }, [post._id]);

  //handleLike

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/post/${post._id}`);
    copyToastify();
  };
  const copyToastify = () => toast.success("Link Copied");
  return (
    <div className="flex-col flex gap-5 py-6 w-full border-b border-[#2b2a2b] ">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* title */}
      <div className="flex justify-between gap-5 w-full ">
        <div className="flex gap-2 ">
          <img
            src={postedByUser[0]?.picture}
            alt=""
            className="w-14 h-14 rounded-full"
          />
          <div>
            <div>
              {/* name tags */}
              <div className="flex items-center gap-2 text-white">
                <h1>{postedByUser[0]?.userName}</h1>
                <GoVerified className="text-[#58e0f1]" />
              </div>

              <h1 className="text-sm text-gray-400">
                {postedByUser[0]?.userName}
              </h1>
            </div>
          </div>
        </div>
        <div>
          {postedByUser[0]?.subId === user.sub ? null : (
            <div>
              {followers?.subId === user.sub ? null : followers?.find(
                  (i) => i._key === user.sub
                ) ? (
                <button
                  onClick={async () => {
                    const res = await followOrUnfollow(post.userId, user);
                    setFollowers(res);
                  }}
                  className="border-mainRed border p-1 px-2 w-full rounded-md  font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 "
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={async () => {
                    const res = await followOrUnfollow(post.userId, user);
                    setFollowers(res);
                  }}
                  className="border-mainRed border p-1 px-2 w-full rounded-md  font-semibold text-mainRed hover:bg-[#FFF3F5] duration-300 "
                >
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="ml-16 mr-24 text-gray-200">{post.caption}</div>
      {/* CONTENT */}
      <div className="flex items-end gap-3  mx-16">
        <Link to={`/post/${post._id}`}>
          <video
            controls
            autoPlay
            muted
            src={post.video}
            className="min-h-[58  0px] w-[336px] bg-white rounded-md "
          ></video>
        </Link>
        <div className="flex flex-col items-center gap-2 text-gray-100">
          {user.name ? (
            <button
              onClick={() => {
                likeOrUnlike(post._id, user).then((res) => setLikes(res));
              }}
              className={`${
                likes?.find((i) => i._key === user.sub) ? "text-mainRed" : ""
              } bg-[#2f2f2f] p-4 rounded-full hover:text-mainRed duration-300`}
            >
              <BsSuitHeartFill className="text-2xl" />
            </button>
          ) : (
            <button
              onClick={() => dispatch(show())}
              className="bg-[#2f2f2f] p-4 rounded-full hover:text-mainRed duration-300"
            >
              <BsSuitHeartFill className="text-2xl" />
            </button>
          )}

          <div className="text-sm font-semibold text-white">
            {likes?.length}
          </div>
          <Link
            to={`/post/${post._id}`}
            className="bg-[#2f2f2f] p-4 rounded-full"
          >
            <BsFillChatDotsFill className="text-2xl" />
          </Link>
          <div className="text-sm font-semibold text-white">
            {post.comments?.length}
          </div>
          <button
            onClick={handleCopy}
            className="bg-[#2f2f2f] p-4 rounded-full"
          >
            <IoMdShareAlt className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
