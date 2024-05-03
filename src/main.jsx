import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App
      predefinedRanges={[
        { label: "Last 7 Days", value: 7 },
        { label: "Last 30 Days", value: 30 },
      ]}
    />
  </React.StrictMode>
);