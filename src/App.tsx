import styles from "./App.module.css";
import Scene from "./Scene";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlanetDetails from "./PlanetDetail";
import SidebarVisibilityButton from "./components/SidebarVisibilityButton";
import GalaxyViewButton from "./components/GalaxyViewButton";
import { Planet } from "./types";

function App() {
  const [currentPlanet, setCurrentPlanet] = useState<Planet>("sun");
  const [showSidebar, setShowSidebar] = useState(true);
  const [galaxyView, setGalaxyView] = useState(false);

  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleGalaxyView = () => {
    setGalaxyView(!galaxyView);
  };

  return (
    <div className={styles.planetApp}>
      {/* Three.js Canvas */}
      <motion.div
        className={styles.planetScene}
        animate={{ width: showSidebar ? "45vw" : "100vw" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Scene
          currentPlanet={currentPlanet}
          setCurrentPlanet={setCurrentPlanet}
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          galaxyView={galaxyView}
          setGalaxyView={setGalaxyView}
        />
        <GalaxyViewButton onClick={toggleGalaxyView} />
        <SidebarVisibilityButton onClick={toggleShowSidebar} />
      </motion.div>

      {/* React Logic for Planet Details */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className={styles.planetSidebar}
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
