export default function PlanetDetails() {
  return (
    <div className="planet-details">
      <div className="information-box">
        <h1 className="planet-name"></h1>
        <hr className="solid-rule" />
        <p className="stinger"></p>
        <div className="planet-info">
          <p className="earth-distance"></p>
          <p className="temperature"></p>
          <p className="radius"></p>
        </div>
        <div className="wiki-excerpt"></div>
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
