import React from "react";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import PostDetails from "./pages/PostDetails";
import GoogleAuthWrapper from "./component/GoogleAuthWrapper";

const App = () => {
  const googleID = import.meta.env.VITE_GOOGLE_API;
  return (
    <GoogleOAuthProvider clientId={googleID}>
      <BrowserRouter>
        <GoogleAuthWrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
