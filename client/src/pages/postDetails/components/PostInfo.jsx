import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsSuitHeartFill, BsFillChatDotsFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { show } from "@/store/showAuth";
import { Link, useParams } from "react-router-dom";
import PostComment from "./PostComment";
import {
  leaveAComment,
  likeOrUnlike,
  getSinglePost,
  followOrUnfollow,
  getSingleUser,
} from "@/helpers/Api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostInfo = ({ postedByUser, post }) => {
  const params = useParams();
  const [newComment, setNewComments] = useState("");
  const [followers, setFollowers] = useState([]);
  const [currentComments, setCurrentComments] = useState();
  const [likes, setLikes] = useState([]);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getSinglePost(params.id).then((res) => {
      setLikes(res.likes);
      setCurrentComments(res.comments);
      getSingleUser(res.userId).then((res) => {
        setFollowers(res.followers);
      });
    });
  }, [params.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/post/${params.id}`);
    copyToastify();
  };
  const copyToastify = () => toast.success("Link Copied");
  console.log(postedByUser.subId);
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
            <Link to={`/profile/${post.userId}`}>
              <img
                src={postedByUser?.picture}
                alt=""
                className="w-12 h-12 rounded-full bg-gray-600"
              />
            </Link>

            <div>
              <div>
                {/* name tags */}
                <div className="flex items-center gap-2 text-white">
                  <h1>{postedByUser?.userName}</h1>
                  {/* <GoVerified className="text-[#58e0f1]" /> */}
                </div>

                <h1 className="text-sm text-gray-400">
                  @
                  {postedByUser?.userName || (
                    <Skeleton className="w-32 animate-pulse " />
                  )}{" "}
                  -{" "}
                  {postedByUser?._updatedAt?.split("", 10) || (
                    <Skeleton className="w-32 animate-pulse " />
                  )}
                </h1>
              </div>
            </div>
          </div>
          {/* BUTTON  */}
          <div>
            {postedByUser?.subId === user.sub ? null : (
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
        {/* TOPIC */}
        <div className="ml-16 mr-24 text-gray-200 hover:underline font-semibold capitalize cursor-pointer">
          #{post?.topic || <Skeleton className="w-32 animate-pulse " />}
        </div>
        {/* CAPTION */}
        <div className="ml-16 mr-24 text-gray-200">
          {post?.caption || <Skeleton className="w-32 animate-pulse " />}
        </div>
        {/* LIKES  COMMENT COUNT  && SHARE BUTTON*/}
        <div className="flex  justify-between p-6 text-white gap-2   ">
          <div className="flex gap-2 justify-between w-3/12 ">
            <div className="flex items-center gap-2">
              <BsSuitHeartFill
                onClick={() =>
                  likeOrUnlike(post._id, user).then((res) => setLikes(res))
                }
                className={`${
                  likes?.find((i) => i._key === user.sub) ? "text-mainRed" : ""
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
            setCurrentComments={setCurrentComments}
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                leaveAComment(post._id, user, newComment).then((res) => {
                  setCurrentComments(res);
                  setNewComments("");
                });
              }}
              className="w-full "
            >
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
