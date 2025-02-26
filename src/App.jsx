import React from "react";
import Scene from "./Scene";
import PlanetDetails from "./PlanetDetail";
import planetCatalogue from "./PlanetData";
import { useState } from "react";

function App() {
  const [currentPlanet, setCurrentPlanet] = useState("mercury");

  // Get camera position dynamically
  const cameraPosition = [
    planetCatalogue[currentPlanet].position,
    0,
    planetCatalogue[currentPlanet].cameraDist,
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      {/* Three.js Canvas */}
      <div id="canvas-container">
        <Scene cameraPosition={cameraPosition} />
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

      <div id="bckgrnd"></div>
    </div>
  );
}

export default App;
