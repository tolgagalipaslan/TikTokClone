import React, { useRef, useState } from "react";
import { FaPlay, FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
const PostVideo = ({ post }) => {
  const [showPlayBtn, setShowPlayBtn] = useState({});
  const bgVideoRef = useRef(null);
  const videoRef = useRef(null);
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
