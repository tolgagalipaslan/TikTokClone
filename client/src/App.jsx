import React from "react";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Navbar from "./component/Navbar";

const App = () => {
  const googleID = import.meta.env.VITE_GOOGLE_API;
  console.log(googleID);
  return (
    <GoogleOAuthProvider clientId={googleID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:name" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
