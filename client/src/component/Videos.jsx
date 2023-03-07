import React from "react";

const Videos = ({ post }) => {
  //Hover Video
  const hoverStartVideo = (e) => {
    e.target.play();
  };
  const hoverPauseVideo = (e) => {
    e.target.pause();
    e.target.currentTime = 0;
  };
  return (
    <div className="h-[380px] flex items-center ">
      <video
        onMouseEnter={hoverStartVideo}
        onMouseOut={hoverPauseVideo}
        src={post.video}
        muted
        className=" object-cover h-full w-full bg-white rounded-md "
      ></video>
    </div>
  );
};

export default Videos;
