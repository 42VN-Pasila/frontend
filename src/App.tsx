import HomePage from "./pages/HomePage/HomePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
// import { ProtectedRoute } from "./shared/components/ProtectedRoute";
// import DashBoard from "./pages/DashBoard/DashBoard";
import AboutPage from "./pages/HomePage/AboutPage";
import GameMonitor from "./pages/Game/GameMonitor";
// import CardSelectionModal from "./pages/Game/components/CardSelectionModal";
// import ModalTest from "./pages/Dev/ModalTest";

const App: React.FC = () => {
  return (
    <div className="relative h-[100dvh] background-color">
      <main className="relative min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route path="/dashboard" element={<DashBoard/>}/> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/game" element={<GameMonitor />} />
          {/* <Route path="/dev/modal" element={<ModalTest />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
