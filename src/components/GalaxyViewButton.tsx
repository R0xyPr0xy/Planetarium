import styles from "./GalaxyViewButton.module.css";

import galaxyIcon from "../assets/galaxy-icon.png";
import { MouseEventHandler } from "react";

type GalaxyViewButtonProps = {
  onClick: MouseEventHandler;
};

export default function GalaxyViewButton({ onClick }: GalaxyViewButtonProps) {
  return (
    <button className={styles.galaxyViewButton} onClick={onClick}>
      <img src={galaxyIcon} className={styles.galaxyIcon}></img>
    </button>
  );
}
