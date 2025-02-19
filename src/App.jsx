import React from "react";
import Scene from "./Scene";
import PlanetDetails from "./PlanetDetail";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      {/* Three.js Canvas */}
      <div style={{ flex: 2 }}>
        <Scene />
      </div>

      {/* React Logic for Planet Details */}
      <div
        style={{ flex: 1, padding: "20px", background: "#222", color: "white" }}
      >
        <PlanetDetails />
      </div>
    </div>
  );
}

export default App;
