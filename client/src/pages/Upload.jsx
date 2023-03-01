import React, { useState } from "react";
import Navbar from "../component/Navbar";
import SideBar from "../component/SideBar";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "../../utils/client";
const Profile = () => {
  //upload video
  const [uploadVideo, setUploadVideo] = useState();
  const handleDiscard = () => {
    setUploadVideo();
  };
  const [looding, setlooding] = useState(false);

  const uploadVideoHandle = async (e) => {
    setlooding(true);
    const selectedFile = e.target.files[0];

    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setUploadVideo(data);
          setlooding(false);
        });
    } else {
      falseFileType();
      setlooding(false);
    }
  };

  const falseFileType = () => toast.error("False Type of video");
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
        {/* Upload */}

        {/* CONTENT */}
        {looding ? (
          <form className="p-5  flex  justify-between bg-white mx-auto my-auto w-1/2 rounded-lg gap-5 select-none ">
            <div className="h-[587px] w-[384px] rounded-lg  border-dashed border-[3px] border-gray-700  shadow-lg shadow-black flex  items-center justify-center bg-slate-300">
              <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2  p-3 px-5 ">
              <h1 className="font-semibold text-2xl">Title</h1>
              <input
                type="text"
                placeholder="Title"
                className=" p-3 px-5 rounded-full text-white  bg-slate-800  w-full outline-none "
              />
              <h1 className="font-semibold text-2xl">Choose Category</h1>

              <select
                type="select"
                className="p-3 px-5 rounded-md text-white  bg-slate-800  w-full outline-none"
              >
                {" "}
                <option value="action">Action</option>
                <option value="drama">Drama</option>
                <option value="comedy">Comedy</option>
                <option value="software">Software</option>
              </select>
              <div className="flex gap-2 mt-auto ">
                <button
                  onClick={handleDiscard}
                  className="p-4 px-5 border border-gray-600 w-full  text-xl "
                >
                  Discard
                </button>
                <button className="p-1 px-5 border border-gray-600 w-full bg-mainRed text-white  text-xl">
                  Upload
                </button>
              </div>
            </div>
          </form>
        ) : null}
        {uploadVideo ? (
          <form className="p-5  flex  justify-between bg-white mx-auto my-auto w-1/2 rounded-lg gap-5 ">
            <video
              className="h-[587px] w-[284px] rounded-lg  border-dashed border-[3px] border-gray-700  shadow-lg shadow-black"
              src={uploadVideo?.url}
              controls
            ></video>
            <div className="w-full flex flex-col gap-2  p-3 px-5 ">
              <h1 className="font-semibold text-2xl">Title</h1>
              <input
                type="text"
                placeholder="Title"
                className=" p-3 px-5 rounded-full text-white  bg-slate-800  w-full outline-none "
              />
              <h1 className="font-semibold text-2xl">Choose Category</h1>

              <select
                type="select"
                className="p-3 px-5 rounded-md text-white  bg-slate-800  w-full outline-none"
              >
                {" "}
                <option value="action">Action</option>
                <option value="drama">Drama</option>
                <option value="comedy">Comedy</option>
                <option value="software">Software</option>
              </select>
              <div className="flex gap-2 mt-auto ">
                <button
                  onClick={handleDiscard}
                  className="p-4 px-5 border border-gray-600 w-full  text-xl "
                >
                  Discard
                </button>
                <button className="p-1 px-5 border border-gray-600 w-full bg-mainRed text-white  text-xl">
                  Upload
                </button>
              </div>
            </div>
          </form>
        ) : looding ? null : (
          <div className="bg-white lg:w-[1000px] lg:h-[458px] mx-auto my-auto  rounded-lg flex  w-fit  ">
            <label className="bg-white lg:w-[900px] lg:h-[386px]  w-fit border-dashed border-[3px] border-gray-300 border-spacing-2 rounded-lg mx-auto my-auto  hover:bg-slate-100 flex flex-col justify-around gap-1 items-center">
              <input
                type="file"
                onChange={uploadVideoHandle}
                className="hidden"
              />
              <FaCloudUploadAlt className="text-8xl opacity-60" />
              <h1 className="font-extrabold  text-3xl">Upload Video</h1>
              <h1 className="text-2xl opacity-70">MP4 or Webm or ogg</h1>
              <h1 className="text-2xl opacity-60">
                720x1280 or above resolution
              </h1>
              <h1 className="text-1xl opacity-60">Up to 30 min</h1>
              <h1 className="text-1xl opacity-60">Less then 2GB</h1>
              <button className="text-2xl rounded bg-mainRed px-28 py-3 text-white ">
                Select File
              </button>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
