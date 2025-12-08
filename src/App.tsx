import HomePage from "./pages/HomePage/HomePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import DashBoard from "./pages/DashBoard/DashBoard";

const App: React.FC = () => {
  return (
    <div className="relative h-[100dvh] text-[#F0E8E5]">
      <video
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/src/assets/bg.mp4" type="video/mp4" />
      </video>

      <main className="relative min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/dashboard" element={<DashBoard/>}/> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
