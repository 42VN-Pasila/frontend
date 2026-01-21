import HomePage from "./pages/HomePage/HomePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import GameMonitor from "./pages/Game/GameMonitor";
// import DashBoard from "./pages/DashBoard/DashBoard";

const App: React.FC = () => {
  return (
    <div className="relative h-[100dvh] background-color">
      <main className="relative min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/game" element={<GameMonitor/>}/>
          {/* <Route path="/dashboard" element={<DashBoard/>}/> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
