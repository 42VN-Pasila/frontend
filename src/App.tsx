import React from "react";

import { Route, Routes } from "react-router-dom";

import { Dashboard } from "./components/Dashboard/Dashboard";
import { ProfilePage } from "./components/Dashboard/ProfilePage";
import { SettingsPage } from "./components/Dashboard/SettingsPage";
import { GameBoard } from "./components/GameBoard/GameBoard";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AboutPage from "./pages/HomePage/AboutPage";
import HomePage from "./pages/HomePage/HomePage";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <div className="relative h-[100dvh] background-color">
      <main className="relative min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/match/:matchId"
            element={
              <ProtectedRoute>
                <GameBoard />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
