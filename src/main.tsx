import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import "./index.css";
import App from "./loginpage.tsx"; 
import Homepage from "./homepage.tsx"; 
import MsgPage from "./msgpage.tsx";
import KantinPage from "./kantin.tsx";
<<<<<<< HEAD
import PrdkKantinPage from "./prdkkantin";
=======
import Keranjang from "./keranjang.tsx";
>>>>>>> 0314bb43088ed84713a66b0bdd3cba466095bc7b

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/homepage" element={<Homepage />} /> 
        <Route path="/msgpage" element={<MsgPage />} />
        <Route path="/kantin" element={<KantinPage />} />
<<<<<<< HEAD
        <Route path="/prdkkantin" element={<PrdkKantinPage />} />
=======
        <Route path="/keranjang" element={<Keranjang />} />
>>>>>>> 0314bb43088ed84713a66b0bdd3cba466095bc7b
      </Routes>
    </Router>
  </StrictMode>
);
