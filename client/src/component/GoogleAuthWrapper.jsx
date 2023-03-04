import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { hide } from "../store/showAuth";
import { createOrGetUser } from "../store/auth";
const GoogleAuthWrapper = () => {
  const showAuth = useSelector((state) => state.showAuth.showAuth);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(hide())}
      className={`${
        showAuth ? "flex " : "hidden"
      } fixed top-0 left-0 z-30 backdrop-blur-md w-screen bg-transparent h-screen items-center justify-center`}
    >
      <div className="bg-[#252525] py-10 p-5 rounded-lg">
        <GoogleLogin
          style={{ background: "red", width: 50, height: 50 }}
          onSuccess={(credentialResponse) => {
            dispatch(createOrGetUser(credentialResponse));
            dispatch(hide());
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default GoogleAuthWrapper;
