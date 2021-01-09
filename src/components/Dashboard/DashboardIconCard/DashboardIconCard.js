import { useDrag } from "react-dnd";
import { DRAG_DROP_ITEMS } from "../../../constants";
import { IS_CARD_COLORS_ON } from "../../../settings";
import "./DashboardIconCard.scss";

function DashboardIconCard(props) {
  // Used to allow card to be dragged into another column
  const [{ isDragging }, drag] = useDrag({
    item: { type: DRAG_DROP_ITEMS.DASHBOARD_CARD, id: props.entry.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const cardColor = IS_CARD_COLORS_ON ? props.entry.color : null;

  return (
    <div
      ref={drag}
      className={`DashboardIconCard ${
        cardColor ? "DashboardIconCard-colored" : ""
      }`}
      style={{ borderColor: cardColor, opacity: isDragging ? 0.5 : 1 }}
      onClick={() => props.onOpenEditEntry(props.entry.id)}
    >
      <img className="logo" src={props.entry.logo} alt={props.entry.company} />
    </div>
  );
}

export default DashboardIconCard;
