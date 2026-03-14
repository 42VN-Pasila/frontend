import HomePage from "./pages/HomePage/HomePage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import AboutPage from "./pages/HomePage/AboutPage";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { GameBoard } from "./components/GameBoard/GameBoard";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/match/:matchId" element={<GameBoard />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
