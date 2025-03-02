import React from "react";
import Scene from "./Scene";
import PlanetDetails from "./PlanetDetail";
import { useState } from "react";
import SidebarVisibilityButton from "./components/SidebarVisibilityButton";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [currentPlanet, setCurrentPlanet] = useState("sun");
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="planet-app">
      {/* Three.js Canvas */}
      <motion.div
        className="planet-scene"
        animate={{ width: showSidebar ? "45vw" : "100vw" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Scene
          currentPlanet={currentPlanet}
          setCurrentPlanet={setCurrentPlanet}
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
        <SidebarVisibilityButton onClick={toggleShowSidebar} />
      </motion.div>

      {/* React Logic for Planet Details */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className="planet-sidebar"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <PlanetDetails
              currentPlanet={currentPlanet}
              setCurrentPlanet={setCurrentPlanet}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
