import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import OtpVerification from "./pages/OtpVerification";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<OtpVerification />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/:slug" element={<Project />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
