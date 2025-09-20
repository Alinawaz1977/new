import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import DoctorContextProvider from "./Context/doctorContext.jsx"; // adjust path if needed

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DoctorContextProvider>
      <App />
    </DoctorContextProvider>
  </BrowserRouter>
);
