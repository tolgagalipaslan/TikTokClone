import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GoogleAuthWrapper from "./component/GoogleAuthWrapper";
import routes from "@/routes/Routes";

const App = () => {
  const googleID = import.meta.env.VITE_GOOGLE_API;
  useEffect(() => {
    if (localStorage.getItem("thema") === null) {
      localStorage.setItem("thema", "dark");
      document.documentElement.classList.add("dark");
    }
  }, []);
  //Routelari Routes.jsxden alip map ile donduruyoruz
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route key={key} path={path} element={component} />
  ));
  return (
    <GoogleOAuthProvider clientId={googleID}>
      <BrowserRouter>
        <GoogleAuthWrapper />
        <Routes>{routeComponents}</Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
