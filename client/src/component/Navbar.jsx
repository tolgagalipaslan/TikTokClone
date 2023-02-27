import React, { useState } from "react";
import { SiTiktok } from "react-icons/si";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
const Navbar = () => {
  const user = false;
  // button icin usestate
  const [authBtn, setAuthBtn] = useState(false);
  return (
    <div className="flex   justify-between  items-center h-[8vh]    ">
      <div className="flex items-center text-3xl text-white">
        <SiTiktok className="text-4xl" />{" "}
        <span className="font-semibold">TikTok</span>
      </div>
      <div>
        <form className="bg-[#2f2f2f]  rounded-full items-center overflow-hidden md:flex hidden  ">
          <input
            type="text"
            className="bg-transparent outline-none py-2 px-4 text-gray-300"
            placeholder="Search "
          />
          <div className="h-full hover:bg-[#474747] py-2 ">
            <button className=" text-[#767373] bg-transparent  outline-none   border-l-2  border-[#616060] px-4 text-2xl">
              <AiOutlineSearch />
            </button>
          </div>
        </form>
      </div>
      <div className="text-white flex items-center  gap-2 ">
        <button className="bg-[#252525] px-4 py-2 rounded items-center flex gap-2 hover:bg-[#474747]">
          <AiOutlinePlus /> Upload
        </button>
        <div>
          {
            // Log In Buttonu user varsa

            user ? (
              <button className="bg-[#252525] px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed">
                Logged In
              </button>
            ) : (
              // Sing In Buttonu user yoksa
              <button
                onClick={() => setAuthBtn(authBtn ? false : true)}
                className="bg-[#252525] px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed"
              >
                Sign In
              </button>
            )
          }
        </div>
      </div>
      {/* MODAL */}

      <div
        onClick={() => setAuthBtn(false)}
        className={`${
          authBtn ? "flex " : "hidden"
        } fixed top-0 left-0 z-30 backdrop-blur-md w-screen bg-transparent h-screen items-center justify-center`}
      >
        <div className="bg-[#252525] py-10 p-5 rounded-lg">
          <GoogleLogin
            style={{ background: "red", width: 50, height: 50 }}
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
