import styles from "./PlanetDetail.module.css";

import { useEffect, useState } from "react";
import planetCatalogueData from "./data/planetCatalogue.json";
import { Planet, PlanetCatalogue } from "./types";

const planetCatalogue: PlanetCatalogue = planetCatalogueData as PlanetCatalogue;

type PlanetDetailProps = {
  currentPlanet: Planet;
  setCurrentPlanet: (value: Planet) => void;
};

type PlanetProps = {
  planet: Planet;
};

// Fetch planet data
async function fetchPlanetData(dataID: string) {
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${dataID}.json`;

  const response = await fetch(url);
  const data = await response.json();

  return data.entities[dataID];
}

// Fetch excerpt
async function fetchExcerpt(wikiPage: string) {
  const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + wikiPage;

  const response = await fetch(url);
  const excerpt = await response.json();

  return excerpt.extract;
}

function WikiExcerpt({ planet }: PlanetProps) {
  const [excerpt, setExcerpt] = useState("Loading");

  const { wikiPage } = planetCatalogue[planet];

  // Add cached data
  useEffect(
    function () {
      setExcerpt("Loading");
      fetchExcerpt(wikiPage).then((extract) => {
        setExcerpt(extract);
      });
    },
    [planet]
  );

  return (
    <div className={styles.wikiExcerpt}>
      {" "}
      <span className={styles.highlighted}>
        {excerpt || "No excerpt available"} — Wikipedia
      </span>
    </div>
  );
}

function PlanetInfo({ planet }: PlanetProps) {
  const [distance, setDistance] = useState("Loading");
  const [temperature, setTemperature] = useState("Loading");
  const [radius, setRadius] = useState("Loading");

  const { dataID, showDistance } = planetCatalogue[planet];

  useEffect(
    function () {
      fetchPlanetData(dataID).then(({ claims }) => {
        setDistance(
          claims?.P2583?.[0]?.mainsnak?.datavalue?.value?.amount ?? "N/A"
        );
        setTemperature(
          claims?.P2076?.[0]?.mainsnak?.datavalue?.value?.amount ?? "N/A"
        );
        setRadius(
          claims?.P2120?.[0]?.mainsnak?.datavalue?.value?.amount ?? "N/A"
        );
      });
    },
    [planet]
  );

  return (
    <div className={styles.planetInfo}>
      {showDistance && (
        <p>
          Distance to Earth :{" "}
          <span className={styles.highlighted}>{distance} km </span>
        </p>
      )}
      {}
      <p>
        Temperature :{" "}
        <span className={styles.highlighted}>{temperature} kelvin </span>
      </p>
      <p>
        Radius : <span className={styles.highlighted}>{radius} km </span>
      </p>
    </div>
  );
}

export default function PlanetDetails({
  currentPlanet,
  setCurrentPlanet,
}: PlanetDetailProps) {
  const { planetName, stinger, previousPlanet, nextPlanet } =
    planetCatalogue[currentPlanet];

  const selectPreviousPlanet = () => {
    setCurrentPlanet(previousPlanet);
  };
  const selectNextPlanet = () => {
    setCurrentPlanet(nextPlanet);
  };

  return (
    <div className={styles.planetDetails}>
      <div className={styles.informationBox}>
        <h1 className={styles.planetName}>{planetName}</h1>
        <hr className={styles.solidRule} />
        <p className={styles.stinger}>{stinger}</p>
        <PlanetInfo planet={currentPlanet} />
        <WikiExcerpt planet={currentPlanet} />
        <button
          className={styles.previousButton}
          onClick={selectPreviousPlanet}
        ></button>
        <button
          className={styles.nextButton}
          onClick={selectNextPlanet}
        ></button>
      </div>
    </div>
  );
}
