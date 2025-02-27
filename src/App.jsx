import React from "react";
import Scene from "./Scene";
import PlanetDetails from "./PlanetDetail";
import { useState } from "react";
import SidebarVisibilityButton from "./components/SidebarVisibilityButton";

function App() {
  const [currentPlanet, setCurrentPlanet] = useState("sun");
  const [shoowSidebar, setShwoSidebar] = useState("true");

  return (
    <div className="planet-app">
      {/* Three.js Canvas */}
      <div className="planet-scene">
        <Scene currentPlanet={currentPlanet} />
        <SidebarVisibilityButton />
      </div>

      {/* React Logic for Planet Details */}

      <div className="planet-sidebar">
        <PlanetDetails
          currentPlanet={currentPlanet}
          setCurrentPlanet={setCurrentPlanet}
        />
      </div>
    </div>
  );
}

export default App;
