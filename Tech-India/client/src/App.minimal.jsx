// MINIMAL TEST VERSION - Use this to test if React works
// To use: Temporarily rename App.jsx to App.full.jsx and rename this to App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";

const MinimalLanding = () => {
  return (
    <div style={{ padding: "50px", background: "#f0f0f0", minHeight: "100vh" }}>
      <h1 style={{ color: "red", fontSize: "32px" }}>✅ React is Working!</h1>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        If you see this, React is rendering correctly.
      </p>
      <p style={{ fontSize: "16px", marginTop: "10px", color: "#666" }}>
        Now let's check why the full app isn't showing...
      </p>
      <div style={{ marginTop: "30px", padding: "20px", background: "white", borderRadius: "10px" }}>
        <h2 style={{ color: "#333" }}>Next Steps:</h2>
        <ol style={{ marginTop: "10px", color: "#666" }}>
          <li>Check browser console (F12) for errors</li>
          <li>Check terminal for build errors</li>
          <li>Make sure all dependencies are installed</li>
        </ol>
      </div>
    </div>
  );
};

const MinimalApp = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MinimalLanding />} />
      </Routes>
    </HashRouter>
  );
};

export default MinimalApp;

