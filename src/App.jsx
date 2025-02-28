import React from "react";
import Scene from "./Scene";
import PlanetDetails from "./PlanetDetail";
import { useState } from "react";
import SidebarVisibilityButton from "./components/SidebarVisibilityButton";

function App() {
  const [currentPlanet, setCurrentPlanet] = useState("sun");
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="planet-app">
      {/* Three.js Canvas */}
      <div
        className="planet-scene"
        style={{ width: showSidebar ? "45vw" : "100vw" }}
      >
        <Scene
          currentPlanet={currentPlanet}
          setCurrentPlanet={setCurrentPlanet}
        />
        <SidebarVisibilityButton onClick={toggleShowSidebar} />
      </div>

      {/* React Logic for Planet Details */}
      {showSidebar && (
        <div className="planet-sidebar" style={{ width: "55vw" }}>
          <PlanetDetails
            currentPlanet={currentPlanet}
            setCurrentPlanet={setCurrentPlanet}
          />
        </div>
      )}
    </div>
  );
}

export default App;
