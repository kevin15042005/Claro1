import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Datos from "./pages/Datos/Index.jsx";
import RutaProtegida from "./components/RuteLock/Index.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/datos"
          element={
            <RutaProtegida>
              <Datos />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
