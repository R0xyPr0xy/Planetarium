import forwardArrowIcon from "../Assets/forward-arrow-icon.png";
export default function SidebarVisibilityButton() {
  return (
    <button className="sidebar-visibility-button">
      <img src={forwardArrowIcon} className="arrow-icon"></img>
    </button>
  );
}
