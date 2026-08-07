import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";

import App from "./App";

import "./index.css";
import "./styles/navbar.css";
import "./styles/dashboard.css";
import "./styles/cards.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import "./styles/loading.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);