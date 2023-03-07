import React, { useEffect, useState } from "react";
import { SiTiktok } from "react-icons/si";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth";
import { BsFillTriangleFill, BsPerson } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { toggle } from "../store/showAuth";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiSun } from "react-icons/fi";
const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const showAuth = useSelector((state) => state.showAuth.showAuth);
  const dispatch = useDispatch();
  const [thema, setThema] = useState();
  const [profileBtn, setProfileBtn] = useState(false);

  const navigate = useNavigate();
  // eger kullanici yoksa upload yapabilmesini engllemek icin
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userValid = ["/upload"];
  //LOCATION VALID
  const location = useLocation();
  useEffect(() => {
    if (!user.name && userValid.includes(location.pathname)) {
      navigate("/");
    }
  }, [location.pathname, navigate, user, userValid]);
  // button icin usestate
  //Switch Thema
  const switchThema = () => {
    if (localStorage.getItem("thema") === "dark") {
      localStorage.setItem("thema", "light");
      document.documentElement.classList.remove("dark");
      setThema(localStorage.getItem("thema"));
    } else {
      localStorage.setItem("thema", "dark");
      document.documentElement.classList.add("dark");
      setThema(localStorage.getItem("thema"));
    }
  };
  return (
    <div className="flex  justify-between  items-center h-[8vh]    ">
      <Link to="/" className="flex items-center text-3xl text-white">
        <SiTiktok className="text-4xl" />{" "}
        <span className="font-semibold">TikTok</span>
      </Link>
      <div>
        <form className="bg-[#2f2f2f] dark:bg-white  rounded-full items-center overflow-hidden md:flex hidden  ">
          <input
            type="text"
            className="bg-transparent outline-none py-2 px-4 text-gray-300 dark:text-black"
            placeholder="Search "
          />
          <div className="h-full hover:bg-[#474747] py-2 ">
            <button className=" text-[#767373] dark:text-black bg-transparent  outline-none   border-l-2  border-[#616060] px-4 text-2xl">
              <AiOutlineSearch />
            </button>
          </div>
        </form>
      </div>
      <div className="text-white dark:text-black flex items-center  gap-2 ">
        {user.name ? (
          <Link
            to="/upload"
            className="bg-[#252525] dark:bg-white   px-4 py-2 rounded items-center flex gap-2 hover:bg-[#474747]"
          >
            <AiOutlinePlus /> Upload
          </Link>
        ) : (
          <button
            onClick={() => dispatch(toggle())}
            className="bg-[#252525]  dark:bg-white  px-4 py-2 rounded items-center flex gap-2 hover:bg-[#474747]"
          >
            <AiOutlinePlus /> Upload
          </button>
        )}

        {/* LOGIN CHECK */}
        <div>
          {
            // Log In Buttonu user varsa

            user.name ? (
              <div className="relative text-[#e8e8e8] dark:text-black group ">
                <img
                  onClick={() => setProfileBtn(profileBtn ? false : true)}
                  className="w-10 h-10 rounded-full cursor-pointer hover:`${}`"
                  src={user.picture}
                  alt=""
                />
                {/* POP UP  */}
                <div
                  className={` group-hover:flex  group-hover:opacity-100  duration-500 hidden absolute -bottom-[140px] right-0 z-30  dark:bg-white  bg-[#252525] flex flex-col  w-[140px]  opacity-0 rounded `}
                >
                  {/* OPTIONS */}
                  <div className=" flex absolute  bottom-full  w-full justify-end pr-3 text-[#252525] dark:text-white right-0 pt-5">
                    <BsFillTriangleFill />
                  </div>
                  <Link
                    to={`/profile/${user.sub}`}
                    className=" p-2 items-center gap-2   flex hover:bg-[#525151] rounded-t "
                  >
                    <BsPerson className="text-lg" /> Your Profile
                  </Link>

                  <div
                    onClick={switchThema}
                    className="w-full p-2 flex  items-center gap-2 hover:bg-[#525151] rounded-b"
                  >
                    {thema === "dark" ? (
                      <>
                        {" "}
                        <MdOutlineDarkMode className="text-lg" />
                        <div>Dark Mode</div>{" "}
                      </>
                    ) : (
                      <>
                        <FiSun className="text-lg" />
                        <div>Light Mode</div>
                      </>
                    )}
                  </div>
                  <div>
                    {" "}
                    <button
                      className=" w-full p-2 flex  items-center gap-2 hover:bg-[#525151] rounded-b "
                      onClick={() => dispatch(logout())}
                    >
                      <BiLogIn className="text-lg" />
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Sing In Buttonu user yoksa
              <button
                onClick={() => dispatch(toggle())}
                className="bg-[#252525]  dark:bg-white  px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed"
              >
                Sign In
              </button>
            )
          }
        </div>
      </div>
      {/* MODAL */}
    </div>
  );
};

export default Navbar;
