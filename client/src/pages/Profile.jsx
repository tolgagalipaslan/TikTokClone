import React from "react";
import Navbar from "../component/Navbar";
import SideBar from "../component/SideBar";
import { FaRegEdit, FaShare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
const Profile = () => {
  const params = useParams();
  //localhost degiscek
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/profile/${params.id}`);
    copyToastify();
  };
  const copyToastify = () => toast.success("Link Copied");
  return (
    <div className="bg-[#121212]  h-screen">
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
      <div className="border-b border-[#2b2a2b]  h-[8vh]  bg-[#121212]">
        <div className=" px-5 h-screen mx-auto  ">
          <Navbar />
        </div>
      </div>
      <div className="flex ">
        <SideBar />
        {/* Profil */}
        <div className="flex flex-col gap-5 pl-4 w-full h-[92vh] overflow-y-auto posts">
          <div className="flex text-white   gap-3 justify-between pt-5  w-fit ">
            <div>
              <img
                src="https://images-ext-2.discordapp.net/external/dZdL3BPXc6tCb7FqBx4D58onzEfRTA_V0e39eNHOt9A/https/i.pinimg.com/originals/3a/d6/eb/3ad6eb0c16eebeab5bafa2804dd08b19.jpg?width=559&height=559"
                alt=""
                className="w-32 h-32 rounded-full"
              />
            </div>
            <div className="flex flex-col  justify-between">
              <div className="flex flex-col ">
                <h1 className="text-3xl font-semibold">Tolga Aslan</h1>
                <h1 className="text-lg font-semibold opacity-80">
                  Tolga Aslan
                </h1>
              </div>
              <button className="flex bg-[#252525] p-2 items-center justify-around rounded ">
                {" "}
                <FaRegEdit /> Edit Profile
              </button>
            </div>
            <div className="w-40 flex justify-end font-semibold text-3xl">
              <FaShare
                onClick={handleCopy}
                className="cursor-pointer hover:bg-[#646464] rounded-full  p-1 text-3xl "
              />
            </div>
          </div>
          {/* videos */}
          <div className="flex flex-col gap-3 text-white  ">
            <div className="flex gap-3 ">
              <h1 className="flex gap-2 items-center">
                <span className="font-semibold text-lg"> 0</span>
                Following
              </h1>
              <h1 className="flex gap-2 items-center">
                <span className="font-semibold text-lg"> 0</span>
                Followers
              </h1>
              <h1 className="flex gap-2 items-center">
                <span className="font-semibold text-lg"> 0</span>
                Videos
              </h1>
            </div>
            <div className="">
              <p className="opacity-80 max-w-[350px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
                deleniti quia distinctio fugit accusamus libero?
              </p>
            </div>
          </div>
          {/* VIDEO CONTENT opacitiy silmeyi unutma */}

          <div className="flex flex-col gap-2 mt-5 mx-auto sm:mx-0">
            <div className="text-xl  text-white font-semibold px-20 border-b-2 border-white w-fit">
              Videos
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5">
              <div className="bg-white  h-[300px] rounded-lg   opacity-80  "></div>
              <div className="bg-white h-[300px] rounded-lg  opacity-80 "></div>
              <div className="bg-white h-[300px] rounded-lg  opacity-80 "></div>
              <div className="bg-white h-[300px] rounded-lg  opacity-80 "></div>
              <div className="bg-white h-[300px] rounded-lg  opacity-80 "></div>
              <div className="bg-white h-[300px] rounded-lg  opacity-80"></div>
              <div className="bg-white h-[300px] rounded-lg  opacity-80 "></div>
              <div className="bg-white h-[300px] rounded-lg  opacity-80 "></div>
              <div className="bg-white h-[300px] rounded-lg  opacity-80 "></div>
              <div className="bg-white h-[300px] rounded-lg  opacity-80 "></div>
            </div>
          </div>

          {/* VIDEO CONTENT END*/}
        </div>
      </div>
    </div>
  );
};

export default Profile;
