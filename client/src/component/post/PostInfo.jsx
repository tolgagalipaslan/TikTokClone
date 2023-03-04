import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsSuitHeartFill, BsFillChatDotsFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { show } from "../../store/showAuth";
import { useParams } from "react-router-dom";
import PostComment from "./PostComment";
import { uid } from "uid";
import { client } from "../../../utils/client";

const PostInfo = ({ postedByUser, post }) => {
  const params = useParams();
  const [newComment, setNewComments] = useState("");
  const [currentComments, setCurrentComments] = useState();
  const [likes, setLikes] = useState([]);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentComments();
    currentLikes();
  }, []);

  const currentLikes = async () => {
    try {
      const query = `*[_type=="post" && _id == "${post._id}"]`;
      const results = await client.fetch(query);
      setLikes(results[0].likes);
      console.log(results[0].likes);
    } catch (error) {
      console.log(error);
    }
  };
  //handleLike
  const handleLike = async () => {
    if (!user.name) {
      dispatch(show());
    } else if (likes.find((i) => i.subId === user.sub)) {
      const newList = likes.filter((i) => i.subId !== user.sub);

      try {
        await client.patch(post._id).set({ likes: newList }).commit();
        getCurrentComments();
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
        getCurrentComments();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/profile/${params.id}`);
    copyToastify();
  };
  //Get Current Comment
  //Get Current comment
  const getCurrentComments = async () => {
    try {
      const query = `*[_type == "post" && _id == "${params.id}"][0]`;
      const results = await client.fetch(query);
      setCurrentComments(results.comments);
      setLikes(results.likes);
    } catch (error) {
      console.log(error);
    }
  };
  const leaveCommentHandle = async (e) => {
    e.preventDefault();
    if (newComment.trimStart() === "") {
      setNewComments("");
    } else {
      try {
        const newList = [
          ...currentComments,
          {
            _key: uid(),
            userName: user?.name,
            picture: user?.picture,
            comment: newComment,
            userId: user?.sub,
          },
        ];
        await client.patch(post._id).set({ comments: newList }).commit();
        setNewComments("");
        getCurrentComments();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const copyToastify = () => toast.success("Link Copied");
  return (
    <div className="w-[30%] md:flex md:flex-col hidden bg-[#121212] h-full">
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
      <div className=" border-b border-[#2f2f2f]  p-4">
        <div className="flex justify-between gap-5 w-full p-4 ">
          <div className="flex gap-2 ">
            <img
              src={postedByUser?.picture}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div>
                {/* name tags */}
                <div className="flex items-center gap-2 text-white">
                  <h1>{postedByUser?.userName}</h1>
                  {/* <GoVerified className="text-[#58e0f1]" /> */}
                </div>

                <h1 className="text-sm text-gray-400">
                  @{postedByUser?.userName} -{" "}
                  {postedByUser?._updatedAt?.split("", 10)}
                </h1>
              </div>
            </div>
          </div>
          {/* BUTTON  */}
          <div>
            {postedByUser?.subId === user.sub ? null : (
              <button className="bg-[#252525] px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed border-mainRed border">
                Follow{" "}
              </button>
            )}
          </div>
        </div>
        {/* TOPIC */}
        <div className="ml-16 mr-24 text-gray-200 hover:underline font-semibold capitalize cursor-pointer">
          #{post?.topic}
        </div>
        {/* CAPTION */}
        <div className="ml-16 mr-24 text-gray-200">{post?.caption}</div>
        {/* LIKES  COMMENT COUNT  && SHARE BUTTON*/}
        <div className="flex  justify-between p-6 text-white gap-2   ">
          <div className="flex gap-2 justify-between w-3/12 ">
            <div className="flex items-center gap-2">
              <BsSuitHeartFill
                onClick={handleLike}
                className={`${
                  likes.find((i) => i.subId === user.sub) ? "text-mainRed" : ""
                } p-2 h-fit w-fit text-2xl  bg-[#2f2f2f] hover:bg-[#1f1f1f] rounded-full`}
              />
              <span className="font-semibold ">{likes?.length}</span>
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <BsFillChatDotsFill className="p-2 h-fit w-fit text-2xl  bg-[#2f2f2f] hover:bg-[#1f1f1f] rounded-full" />
              <span className="font-semibold ">{currentComments?.length}</span>
            </div>
          </div>
          <FaShare
            onClick={handleCopy}
            className="p-2 h-fit w-fit text-2xl  bg-[#2f2f2f] hover:bg-[#1f1f1f] rounded-full"
          />
        </div>
      </div>
      {/* COMMENT SECTION */}
      <div className="w-full h-full flex p-5 flex-col-reverse justify-end items-center gap-4 overflow-y-auto mainSideBar border-b border-[#2f2f2f] ">
        {currentComments?.map((comment, i) => (
          <PostComment
            getCurrentComments={getCurrentComments}
            currentComments={currentComments}
            post={post}
            key={i}
            comment={comment}
          />
        ))}
      </div>
      {/* ADD COMMENT */}
      <div className="h-[120px] px-8 flex justify-center">
        {user.name ? (
          <div className="w-full flex justify-center py-5 ">
            <form onSubmit={leaveCommentHandle} className="w-full ">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComments(e.target.value.trimStart())}
                className="w-full rounded-lg bg-[#2f2f2f] p-3  outline-none text-[#e5ebcc]"
                placeholder="Make a comment..."
              />
            </form>
          </div>
        ) : (
          <div className="w-full flex justify-center py-5 ">
            <button
              onClick={() => dispatch(show())}
              type="text"
              className="w-full rounded-lg bg-mainRed p-3  outline-none font-semibold text-[#e5ebcc]"
              placeholder="Make a comment..."
            >
              Log In / Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostInfo;
