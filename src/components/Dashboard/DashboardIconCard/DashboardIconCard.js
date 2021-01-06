import { IS_CARD_COLORS_ON } from "../../../settings";
import "./DashboardIconCard.scss";

function DashboardIconCard(props) {
  const cardColor = IS_CARD_COLORS_ON ? props.entry.color : null;

  return (
    <div
      className={`DashboardIconCard ${
        cardColor ? "DashboardIconCard-colored" : ""
      }`}
      style={{ borderColor: cardColor }}
      onClick={() => props.onOpenEditEntry(props.entry)}
    >
      <img className="logo" src={props.entry.logo} alt={props.entry.company} />
    </div>
  );
}

export default DashboardIconCard;
