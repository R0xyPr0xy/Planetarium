import styles from "./SidebarVisibilityButton.module.css";

import { MouseEventHandler } from "react";
import forwardArrowIcon from "../assets/forward-arrow-icon.png";

type SidebarVisibilityButtonProps = {
  onClick: MouseEventHandler;
};

export default function SidebarVisibilityButton({
  onClick,
}: SidebarVisibilityButtonProps) {
  return (
    <button className={styles.sidebarVisibilityButton} onClick={onClick}>
      <img src={forwardArrowIcon} className={styles.arrowIcon}></img>
    </button>
  );
}
