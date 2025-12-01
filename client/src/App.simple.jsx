// Simple test version - uncomment this in main.jsx to test if React works
import React from "react";

const SimpleApp = () => {
  return (
    <div style={{ padding: "50px", background: "#f0f0f0", minHeight: "100vh" }}>
      <h1 style={{ color: "red", fontSize: "32px" }}>✅ React is Working!</h1>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        If you see this, React is rendering correctly.
      </p>
      <p style={{ fontSize: "16px", marginTop: "10px", color: "#666" }}>
        Now let's check why the full app isn't showing...
      </p>
    </div>
  );
};

export default SimpleApp;

