import HomePage from "./pages/HomePage/HomePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import DashBoard from "./pages/DashBoard/DashBoard";

const App: React.FC = () => {
  return (
    <div className="relative h-[100dvh] bg-black">
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
