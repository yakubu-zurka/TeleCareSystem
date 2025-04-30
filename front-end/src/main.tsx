import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Ensure Tailwind or global styles are loaded

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap App inside BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
