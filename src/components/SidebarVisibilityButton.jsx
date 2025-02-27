import forwardArrowIcon from "../Assets/forward-arrow-icon.png";
export default function SidebarVisibilityButton({ onClick }) {
  return (
    <button className="sidebar-visibility-button" onClick={onClick}>
      <img src={forwardArrowIcon} className="arrow-icon"></img>
    </button>
  );
}
