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
    <div className="wiki-excerpt">
      {" "}
      <span className="highlighted">
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
    <div className="planet-info">
      {showDistance && (
        <p className="earth-distance">
          Distance to Earth :{" "}
          <span className="highlighted">{distance} km </span>
        </p>
      )}
      {}
      <p className="temperature">
        Temperature : <span className="highlighted">{temperature} kelvin </span>
      </p>
      <p className="radius">
        Radius : <span className="highlighted">{radius} km </span>
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
    <div className="planet-details">
      <div className="information-box">
        <h1 className="planet-name">{planetName}</h1>
        <hr className="solid-rule" />
        <p className="stinger">{stinger}</p>
        <PlanetInfo planet={currentPlanet} />
        <WikiExcerpt planet={currentPlanet} />
        <button
          className="previous-button"
          onClick={selectPreviousPlanet}
        ></button>
        <button className="next-button" onClick={selectNextPlanet}></button>
      </div>
    </div>
  );
}
