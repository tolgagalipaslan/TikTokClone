import React from "react";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";

const App = () => {
  const googleID = import.meta.env.VITE_GOOGLE_API;
  console.log(googleID);
  return (
    <GoogleOAuthProvider clientId={googleID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
