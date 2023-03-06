import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { client } from "@/utils/client";
import { deleteComment } from "@/helpers/Api";

const PostComment = ({ comment, setCurrentComments, post }) => {
  const user = useSelector((state) => state.user.user);

  //delete comment
  // const deleteHandleComment = async () => {
  //   try {
  //     const newList = currentComments.filter((i) => i._key !== comment._key);

  //     await client.patch(post._id).set({ comments: newList }).commit();
  //     getCurrentComments();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="flex gap-2 w-11/12 mx-auto p-3  border-b border-[#2f2f2f] relative  group">
      <img src={comment.picture} alt="" className="w-12 h-12 rounded-full" />
      <div>
        <div>
          {/* name tags */}
          <div className="flex items-center gap-2 text-white">
            <h1 className="font-bold"> {comment.name}</h1>
            {/* <GoVerified className="text-[#58e0f1]" /> */}
          </div>

          <h1 className="text-sm text-white opacity-90">{comment.comment}</h1>
        </div>
      </div>
      {user?.sub === comment.userId ? (
        <button
          onClick={() =>
            deleteComment(post._id, comment, user).then((res) =>
              setCurrentComments(res)
            )
          }
          className="absolute right-0  top-0 text-2xl text-mainRed group-hover:flex hidden"
        >
          <AiOutlineCloseCircle />
        </button>
      ) : null}
    </div>
  );
};

export default PostComment;
