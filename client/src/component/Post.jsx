import React, { useEffect, useState } from "react";
//icons
import { GoVerified } from "react-icons/go";
import { BsFillChatDotsFill, BsSuitHeartFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../../utils/client";
import { Link } from "react-router-dom";
import { show } from "../store/showAuth";
const Post = ({ post, allUsers }) => {
  const user = useSelector((state) => state.user.user);
  const postedByUser = allUsers?.filter((i) => i.subId === post.postedBy._ref);
  const [likes, setLikes] = useState([]);
  const [authBtn, setAuthBtn] = useState(false);
  const dispatch = useDispatch();

  //handleLike
  useEffect(() => {
    currentLikes();
  }, []);
  const currentLikes = async () => {
    try {
      const query = `*[_type=="post" && _id == "${post._id}"]`;
      const results = await client.fetch(query);
      setLikes(results[0].likes);
    } catch (error) {
      console.log(error);
    }
  };
  //handleLike
  const handleLike = async () => {
    if (likes.find((i) => i.subId === user.sub)) {
      const newList = likes.filter((i) => i.subId !== user.sub);

      try {
        await client.patch(post._id).set({ likes: newList }).commit();
        currentLikes();
      } catch (error) {
        console.log(error);
      }
    } else {
      const newUser = {
        _key: user.sub,
        userName: user.name,
        picture: user.picture,
        subId: user.sub,
      };
      const newList = [...likes, newUser];
      try {
        await client.patch(post._id).set({ likes: newList }).commit();
        currentLikes();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex-col flex gap-5 py-6 w-full border-b border-[#2b2a2b] ">
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
            <button className="bg-[#252525] px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed border-mainRed border">
              Follow{" "}
            </button>
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
            className="min-h-[600px] w-[336px] bg-white rounded-md "
          ></video>
        </Link>
        <div className="flex flex-col items-center gap-2 text-gray-100">
          {user.name ? (
            <button
              onClick={handleLike}
              className={`${
                likes.find((i) => i.subId === user.sub) ? "text-mainRed" : ""
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
