import HomePage from "./pages/HomePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <>
      <video
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-75"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/src/assets/bg.mp4" type="video/mp4" />
      </video>

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
