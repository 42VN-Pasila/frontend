import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/api/queryClient";
import { AuthProvider } from "@shared/auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
