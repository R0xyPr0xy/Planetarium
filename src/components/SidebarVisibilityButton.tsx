import { MouseEventHandler } from "react";
import forwardArrowIcon from "../assets/forward-arrow-icon.png";

type SidebarVisibilityButtonProps = {
  onClick: MouseEventHandler;
};

export default function SidebarVisibilityButton({
  onClick,
}: SidebarVisibilityButtonProps) {
  return (
    <button className="sidebar-visibility-button" onClick={onClick}>
      <img src={forwardArrowIcon} className="arrow-icon"></img>
    </button>
  );
}
