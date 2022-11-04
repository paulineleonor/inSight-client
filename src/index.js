import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Commented out due to causing issues with function running twice
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
