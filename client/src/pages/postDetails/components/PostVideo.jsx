import React, { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
const PostVideo = ({ post, nextPostId, prevPostId }) => {
  const [showPlayBtn, setShowPlayBtn] = useState({});
  const bgVideoRef = useRef(null);
  const videoRef = useRef(null);
  const params = useParams();
  useEffect(() => {
    videoRef.current.currentTime = 0;
  }, [params.id]);
  const handleVideoControls = () => {
    if (videoRef?.current.paused) {
      bgVideoRef?.current.pause();
      setShowPlayBtn(true);
    } else {
      bgVideoRef?.current.play();
      setShowPlayBtn(false);
    }
  };
  return (
    <div className="md:w-[70%]  w-full   relative   h-full flex overflow-x-hidden">
      <Link
        to="/"
        className="absolute  left-5 top-5 z-50 cursor-pointer text-3xl text-white rounded-full bg-[#505050] p-2 hover:bg-[#313030]"
      >
        <AiOutlineClose />
      </Link>
      <div className="flex flex-col gap-5 absolute right-5 z-50 top-1/2 -translate-y-1/2">
        {prevPostId !== undefined ? (
          <Link
            to={`/post/${prevPostId}`}
            className="p-2 rounded-full bg-[#505050] text-lg cursor-pointer text-white hover:bg-[#313030]"
          >
            <AiOutlineUp className="text-3xl" />
          </Link>
        ) : (
          <button
            disabled
            className="p-2 rounded-full bg-[#505050] text-lg cursor-pointer opacity-0 text-white hover:bg-[#313030] "
          >
            <AiOutlineUp className="text-3xl" />
          </button>
        )}
        {nextPostId !== undefined ? (
          <Link
            to={`/post/${nextPostId}`}
            className="p-2 rounded-full bg-[#505050] text-lg cursor-pointer text-white hover:bg-[#313030] "
          >
            <AiOutlineDown className="text-3xl" />
          </Link>
        ) : (
          <button
            disabled
            className="p-2 rounded-full bg-[#505050] text-lg cursor-pointer  opacity-0 text-white hover:bg-[#313030] "
          >
            <AiOutlineDown className="text-3xl" />
          </button>
        )}
      </div>
      <div className="w-full  h-full flex  justify-center">
        <video
          muted
          ref={bgVideoRef}
          src={post?.video}
          className="object-cover  blur-2xl opacity-90 grayscale-[50%]  w-full h-full "
        ></video>
        <div
          className="absolute w-full h-full flex  justify-center cursor-pointer "
          onClick={() => {
            videoRef.current.paused
              ? videoRef.current.play()
              : videoRef.current.pause();
          }}
        >
          <video
            controls
            ref={videoRef}
            controlsList="nofullscreen"
            onClick={handleVideoControls}
            onPlay={handleVideoControls}
            onPause={handleVideoControls}
            onTimeUpdate={(e) =>
              (bgVideoRef.current.currentTime = e.target.currentTime)
            }
            src={post?.video}
            className="object-cover  flex items-center justify-center "
          ></video>
          <button
            className={`${
              showPlayBtn ? "flex" : "hidden"
            } text-white  -translate-x-1/2 -translate-y-1/2 text-6xl z-50 absolute left-1/2 top-1/2`}
          >
            <FaPlay />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostVideo;
