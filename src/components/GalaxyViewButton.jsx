import "./GalaxyViewButton.css";

import galaxyIcon from "../assets/galaxy-icon.png";
export default function GalaxyViewButton({ onClick }) {
  return (
    <button className="galaxy-view-button" onClick={onClick}>
      <img src={galaxyIcon} className="galaxy-icon"></img>
    </button>
  );
}
