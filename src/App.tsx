import HomePage from "./pages/HomePage/HomePage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import AboutPage from "./pages/HomePage/AboutPage";
import { Dev } from "./pages/Dev/Dev";
import { Dashboard } from "./components/Dashboard/Dashboard";

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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dev" element={<Dev />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
