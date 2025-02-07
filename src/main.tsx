import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes dan Route
import "./index.css";
import App from "./loginpage.tsx"; // Pastikan ini mengarah ke file yang benar
import Homepage from "./homepage.tsx"; // Impor homepage.tsx
import MsgPage from "./msgpage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Rute untuk login page */}
        <Route path="/homepage" element={<Homepage />} /> {/* Rute untuk homepage */}
        <Route path="/msgpage" element={<MsgPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
