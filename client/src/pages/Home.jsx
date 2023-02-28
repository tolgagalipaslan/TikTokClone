import React from "react";
import Navbar from "../component/Navbar";
import SideBar from "../component/SideBar";
import Post from "../component/Post";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <div>
      <div className="bg-[#121212] h h-screen">
        <div className="border-b border-[#2b2a2b]  h-[8vh] ">
          <div className="max-w-[1150px] h-screen mx-auto ">
            <Navbar />
          </div>
        </div>
        <div className="flex   max-w-[1150px]  mx-auto justify-between ">
          <SideBar />
          <div className="w-10/12  md:w-7/12 flex-col flex h-[91vh] overflow-y-auto pt-5  posts">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
