import React from "react";
import Scene from "./Scene";
import PlanetDetails from "./PlanetDetail";
import { useState } from "react";

function App() {
  const [currentPlanet, setCurrentPlanet] = useState("sun");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        background: "black",
      }}
    >
      {/* Three.js Canvas */}
      <div id="canvas-container">
        <Scene currentPlanet={currentPlanet} />
      </div>

      {/* React Logic for Planet Details */}
      <div
        style={{ flex: 1, padding: "20px", background: "#222", color: "white" }}
      >
        <PlanetDetails
          currentPlanet={currentPlanet}
          setCurrentPlanet={setCurrentPlanet}
        />
      </div>
    </div>
  );
}

export default App;
