import { useState } from "react";
// import { Canvas } from "@react-three/fiber";
let currentPlanet = "Mercury";
let wikiPage;
let dataID;

fetchData(currentPlanet);

function fetchData(planet) {
  switch (planet) {
    case "Mercury":
      wikiPage = "Mercury_(planet)";
      dataID = "Q308";
      break;
    case "Earth":
      wikiPage = "Earth";
      dataID = "Q2";
      break;
    case "Sun":
      wikiPage = "Sun";
      dataID = "Q525";
      break;
  }
}

// Fetch planet data
async function fetchPlanetData() {
  let url = `https://www.wikidata.org/wiki/Special:EntityData/${dataID}.json`;

  let response = await fetch(url);
  let data = await response.json();

  return data.entities[dataID];
}

// Fetch excerpt
async function fetchExcerpt() {
  let url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + wikiPage;

  let response = await fetch(url);
  let excerpt = await response.json();

  return excerpt.extract;
}

export default function PlanetDetails() {
  const planetName = "Mercury";
  const stinger = "Nearest planet to the Sun";

  const [distance, setDistance] = useState("");
  const [temperature, setTemperature] = useState("");
  const [radius, setRadius] = useState("");
  const [excerpt, setExcerpt] = useState("");

  fetchPlanetData().then(({ claims }) => {
    setDistance(claims.P2583[0].mainsnak.datavalue.value.amount);
    setTemperature(claims.P2076[0].mainsnak.datavalue.value.amount);
    setRadius(claims.P2120[0].mainsnak.datavalue.value.amount);
  });

  fetchExcerpt().then((extract) => {
    setExcerpt(extract);
  });

  return (
    <div className="planet-details">
      <div className="information-box">
        <h1 className="planet-name">{planetName}</h1>
        <hr className="solid-rule" />
        <p className="stinger">{stinger}</p>
        <div className="planet-info">
          <p className="earth-distance">
            Distance to Earth :{" "}
            <span className="highlighted">{distance} km </span>
          </p>
          <p className="temperature">
            Temperature :{" "}
            <span className="highlighted">{temperature} kelvin </span>
          </p>
          <p className="radius">
            Radius : <span className="highlighted">{radius} km </span>
          </p>
        </div>
        <div className="wiki-excerpt">
          {" "}
          <span className="highlighted">
            {excerpt || "No excerpt available"} — Wikipedia
          </span>
        </div>
        <a href="sun.html">
          <button className="previous-button"></button>
        </a>
        <a href="earth.html">
          <button className="next-button"></button>
        </a>
      </div>
    </div>
  );
}
